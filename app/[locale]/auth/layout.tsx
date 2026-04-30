import LocaleSwitcher from "@/components/Common/LocaleSwitcher";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative overflow-hidden ">
      <img
        className="absolute left-14 top-2.5 h-16 "
        src="/imgs/samrtParkingLogo.png"
      />
      <LocaleSwitcher className="absolute right-8 top-[18px]" />
      <img
        className="max-lg:hidden fixed left-0 bottom-0 -z-10 h-full aspect-1"
        src="/imgs/authWave.png"
      />
      <div className="w-screen h-screen px-8 grid grid-cols-1 lg:grid-cols-2 gap-28">
        <div className="hidden lg:flex justify-end items-center ">
          <img src="/imgs/authBg.svg" className="w-[500px]" />
        </div>
        <div className="flex justify-center lg:justify-start items-center text-center">
          <div className="w-96">
            <Image
              src="/imgs/authAvatar.svg"
              alt="Avatar"
              width={100}
              height={100}
              className="mx-auto"
            />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
