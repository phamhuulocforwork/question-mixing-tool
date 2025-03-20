"use client";

import * as React from "react";

import { FileSearch, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function UsageDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='outline' className='cursor-pointer'>
          <FileSearch /> Xem hướng dẫn
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full'>
          <DrawerHeader>
            <DrawerTitle>Hướng dẫn sử dụng</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <div className='flex justify-end'>
              <DrawerClose asChild>
                <Button variant='outline' className='cursor-pointer'>
                  <X /> Đóng
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
