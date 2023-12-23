import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Bridge from "../components/Icons/Bridge";
import Logo from "../components/Icons/Logo";
import Modal from "../components/Modal";
import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    // Shuffle the array on mount or whenever the images array changes
    setShuffledImages(shuffleArray(images));
  }, [images]);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Head>
        <title>ENSIAS Moments</title>
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dozcs6owz/image/upload/v1703358557/Untitled_design_3_bh6nrh.png"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dozcs6owz/image/upload/v1703358557/Untitled_design_3_bh6nrh.png"
        />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-between gap-4 overflow-hidden rounded-lg bg-[url('https://res.cloudinary.com/dozcs6owz/image/upload/v1703350261/protector_sccpe6.jpg')] bg-cover bg-center px-6 pb-16 pt-4 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            {/* <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex max-h-full max-w-full items-center justify-center">
                <Bridge />
              </span>
              <span className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
            </div> */}
            <div className="flex-col gap-1">
              <h1 className="font-inter text-[16vw] font-extrabold leading-[0.9] tracking-[-2px] text-[#FFF] md:mb-[2px] md:ml-[-10px] md:mt-3 md:text-[50px]">
                ENSIAS Moments
              </h1>
              <p className="mt-2 max-w-[48ch] text-white/75 sm:max-w-[42ch]">
                Welcome to "ENSIAS Moments," a vibrant online community
                dedicated to capturing and sharing the unforgettable memories of
                students and graduates from ENSIAS
              </p>
            </div>

            <a
              className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
              href="https://web.facebook.com/groups/ensiaspictures"
              target="_blank"
              rel="noreferrer"
            >
              Upload Your Favorite Picture
            </a>
          </div>

          {shuffledImages.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt="Next.js Conf photo"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}
        </div>
      </main>
      {/* <footer className="sm:p-46 flex p-6 text-center text-white/80">
        ENSIAS Moments are not just captured in photographs; they are imprinted
        in the minds and hearts of a community that values the pursuit of
        knowledge, collaboration, and the pursuit of excellence.
      </footer> */}
      <div
        className=" bg-cover bg-bottom py-64"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/dozcs6owz/image/upload/v1703341646/ensias/_MG_2922_zg03ni.jpg")',
        }}
      >
        <div className="container mx-auto flex flex-col items-end">
          <p className="mb-4 ml-4 mr-4 pt-8 text-center text-2xl text-white md:ml-32 md:mr-32">
            {/* ENSIAS Moments are not just captured in photographs; they are
            imprinted in the minds and hearts of a community that values the
            pursuit of knowledge, collaboration, and the pursuit of excellence. */}
            <strong>ENSIAS Moments</strong> are more than photos; they linger in
            the minds and hearts of a community that values caring,
            collaboration, and the pursuit of excellence through mutual support.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();
  let reducedResults: ImageProps[] = [];

  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    });
    i++;
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image);
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  }

  return {
    props: {
      images: reducedResults,
    },
  };
}

{
  /* <a
          href="https://edelsonphotography.com/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          All The ENSIASTES
        </a>
        ,{" "}
        <a
          href="https://www.newrevmedia.com/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Jenny Morgan
        </a>
        , and{" "}
        <a
          href="https://www.garysextonphotography.com/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Gary Sexton
        </a>{" "}
        for the pictures. */
}
