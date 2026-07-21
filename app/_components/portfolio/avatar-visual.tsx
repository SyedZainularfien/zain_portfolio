import Image from "next/image";
import avatarImage from "@/public/zain-avatar.png";

export function AvatarVisual() {
  return (
    <div className="w-[250px] md:w-[440px] lg:w-[520px] xl:w-[600px]">
      <Image
        src={avatarImage}
        alt="Portrait avatar of Zain"
        sizes="(max-width: 767px) 250px, (max-width: 1023px) 440px, (max-width: 1279px) 520px, 600px"
        placeholder="blur"
        preload
        className="h-auto w-full"
      />
    </div>
  );
}
