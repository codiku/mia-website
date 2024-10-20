import { ArrowDownToLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 relative">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center no-underline gap-4" href="#">
          <Image src="/images/icon.svg" alt="Mia" width={32} height={32} />
          Mia
        </Link>
      </header>
      <main className="flex-1">
        {/* Add download button and arrow */}
        <div className="flex justify-center 2xl:absolute top-24 right-6  ">
          <a
            href="https://drive.usercontent.google.com/download?id=1LnuB5YQLDqBsQ3FLrQIcvBLW4xSSgWfV&export=download&authuser=0&confirm=t&uuid=cea8f42e-6c6f-42ba-9134-c84eef0d1c10&at=AN_67v3plsqABEykUYie3cjVPSX8%3A1728922027854"
            className="no-underline inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <ArrowDownToLine className="mr-2 h-5 w-5" />
            Download for Mac
          </a>
        </div>
        <Image
          src="/images/arrow.svg"
          alt="Arrow pointing to download"
          width={100}
          height={100}
          className="hidden 2xl:block mb-2 absolute top-24 right-80 rotate-[28deg]"
        />

        <section className="w-full mt-6">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="tracking-tighter sm:text-4xl md:text-5xl lg:text-3xl">
                  A fully local desktop AI assistant you can train.
                </h1>
                <div className=" mx-auto  text-gray-500 md:text-md dark:text-gray-400">
                  <p className="mt-8">
                    Experience a <strong>secure</strong>, local AI assistant.
                  </p>
                  <p>
                    Mia <strong>runs on your device</strong>, ensuring <strong>privacy</strong> and fast performance.
                  </p>
                  <p>
                    It <strong>can browse</strong> and <strong>learn</strong> from the web.
                  </p>
                  <p>
                    Call it from <strong>anywhere</strong>, anytime (⌘+p)
                  </p>
                </div>
              </div>

              {/* Add video component */}
              <div className="mt-8 flex justify-center rounded-lg w-fit">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://drive.google.com/file/d/1GuQgAfhZ-QQHCxextHilTTaEPrr3KZ7C/preview"
                  width="640"
                  height="480"
                  allow="autoplay"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
