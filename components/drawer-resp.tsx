"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@react-hook/media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Montserrat as FontSans } from "next/font/google";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";

// ELEMENT

// font
const montserrat = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const openSans = localFont({
  src: "../assets/font/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf",
  display: "swap",
});

// SYSTEM

// member data
const memberName = "Josh";
const memberRegion = "Jawa Barat";
const memberPhone = "+621234567890";

// validate input phone
const inputPhone = (phoneInput: React.RefObject<HTMLInputElement>) => {
  if (phoneInput.current) {
    phoneInput.current.oninvalid = function (event: Event) {
      const target = event.target as HTMLInputElement;
      if (target) {
        target.setCustomValidity(
          'Berikan tanda "+" diawal nomor (contoh: +62)'
        );
      }
    };

    phoneInput.current.oninput = function (event: Event) {
      const target = event.target as HTMLInputElement;
      if (target) {
        target.setCustomValidity("");
      }
    };
  }
};

export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={cn(
              roboto.className,
              "lap:mx-auto tab:ml-11 mob:mx-auto rounded-full absolute inset-x-0 bottom-8 lap:h-11 lap:w-[80%] lap:translate-y-0 tab:h-11 tab:w-[30%] tab:-translate-y-[28vh] mob:h-12 mob:w-[80%] mob:translate-y-0 text-s text-[#000123] bg-[#3C739D] hover:text-white hover:bg-[rgb(60,115,157,0.5)] active:text-white active:bg-[rgba(60,115,157,0.7)]"
            )}
          >
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent
          className={cn(
            openSans.className,
            "sm:max-w-[425px] bg-[#112233] border-none select-none cursor-default"
          )}
        >
          <DialogHeader>
            <DialogTitle
              className={cn(
                montserrat.className,
                "text-white text-[20px] font-normal"
              )}
            >
              Edit profile
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-[12px]">
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className={cn(
            roboto.className,
            "lap:mx-auto tab:ml-11 mob:mx-auto rounded-full absolute inset-x-0 bottom-8 lap:h-11 lap:w-[80%] lap:translate-y-0 tab:h-11 tab:w-[30%] tab:-translate-y-[28vh] mob:h-12 mob:w-[80%] mob:translate-y-0 text-s text-[#000123] bg-[#3C739D] hover:text-white hover:bg-[rgb(60,115,157,0.5)] active:text-white active:bg-[rgba(60,115,157,0.7)]"
          )}
        >
          Edit Profile
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className={cn(
          openSans.className,
          "bg-[#112233] border-none blur-none select-none cursor-default"
        )}
      >
        <DrawerHeader className="text-left">
          <DrawerTitle
            className={cn(
              montserrat.className,
              "text-white text-[20px] font-normal"
            )}
          >
            Edit profile
          </DrawerTitle>
          <DrawerDescription className="text-zinc-400 text-[12px]">
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button
              className="text-[#d9d9d9] active:text-transparent"
              variant="outline"
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const phoneInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputPhone(phoneInputRef);
  }, []);

  return (
    <form className={cn("grid items-start gap-2", className)}>
      <div className="grid gap-1">
        <label className="text-[14px] text-white" htmlFor="name">
          Nama :
        </label>
        <input
          className="h-8 px-4 mx-4 text-[#d9d9d9] outline-none bg-transparent border-b border-inherit focus:border-b-2"
          id="name"
          pattern="^(?! )[A-Za-z ]+$"
          maxLength={15}
          defaultValue={memberName}
          required
        />
      </div>

      <div className="grid gap-1">
        <label className="text-[14px] text-white" htmlFor="region">
          Asal Daerah :
        </label>
        <Select>
          <SelectTrigger
            className="h-8 px-4 mx-4 text-[16px] text-[#d9d9d9] outline-none bg-transparent border-b border-inherit focus:border-b-2"
            id="region"
          >
            <SelectValue placeholder={memberRegion} />
          </SelectTrigger>
          <SelectContent
            side="bottom"
            position="popper"
            className={cn(openSans.className, "bg-[#d9d9d9] text-black h-40")}
          >
            <SelectItem value="11">Aceh</SelectItem>
            <SelectItem value="12">Sumatera Utara</SelectItem>
            <SelectItem value="13">Sumatera Barat</SelectItem>
            <SelectItem value="16">Sumatera Selatan</SelectItem>
            <SelectItem value="14">Riau</SelectItem>
            <SelectItem value="21">Kepulauan Riau</SelectItem>
            <SelectItem value="15">Jambi</SelectItem>
            <SelectItem value="17">Bengkulu</SelectItem>
            <SelectItem value="18">Lampung</SelectItem>
            <SelectItem value="19">Bangka Belitung</SelectItem>
            <SelectItem value="31">Jakarta</SelectItem>
            <SelectItem value="36">Banten</SelectItem>
            <SelectItem value="32">Jawa Barat</SelectItem>
            <SelectItem value="33">Jawa Tengah</SelectItem>
            <SelectItem value="34">Yogyakarta</SelectItem>
            <SelectItem value="35">Jawa Timur</SelectItem>
            <SelectItem value="51">Bali</SelectItem>
            <SelectItem value="61">Kalimantan Barat</SelectItem>
            <SelectItem value="62">Kalimantan Tengah</SelectItem>
            <SelectItem value="63">Kalimantan Selatan</SelectItem>
            <SelectItem value="64">Kalimantan Timur</SelectItem>
            <SelectItem value="65">Kalimantan Utara</SelectItem>
            <SelectItem value="52">Nusa Tenggara Barat</SelectItem>
            <SelectItem value="53">Nusa Tenggara Timur</SelectItem>
            <SelectItem value="71">Sulawesi Utara</SelectItem>
            <SelectItem value="72">Sulawesi Tengah</SelectItem>
            <SelectItem value="73">Sulawesi Selatan</SelectItem>
            <SelectItem value="74">Sulawesi Tenggara</SelectItem>
            <SelectItem value="75">Gorontalo</SelectItem>
            <SelectItem value="76">Sulawesi Barat</SelectItem>
            <SelectItem value="81">Maluku</SelectItem>
            <SelectItem value="82">Maluku Utara</SelectItem>
            <SelectItem value="91">Papua</SelectItem>
            <SelectItem value="92">Papua Barat</SelectItem>
            <SelectItem value="00">Lainnya/Luar Indonesia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1">
        <label className="text-[14px] text-white" htmlFor="phone">
          No. Telepon :
        </label>
        <input
          ref={phoneInputRef}
          className="h-8 px-4 mx-4 text-[#d9d9d9] outline-none bg-transparent border-b border-inherit focus:border-b-2"
          id="phone"
          pattern="\+[0-9]+"
          defaultValue={memberPhone}
          required
        />
      </div>

      <Button
        className="text-[#112233] bg-[#d9d9d9] mt-8 active:scale-[0.99]"
        type="submit"
      >
        Save changes
      </Button>
    </form>
  );
}
