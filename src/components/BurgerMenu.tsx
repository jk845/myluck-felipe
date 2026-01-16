// // import { Menu } from "lucide-react";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { useState } from "react";
//
// interface BurgerMenuProps {
//   mode?: "dark" | "light";
// }
//
// export function BurgerMenu({ mode = "dark" }: BurgerMenuProps) {
//   const [open, setOpen] = useState(false);
//   const isDarkMode = mode === "dark";
//
//   return (
//     <>
//       {/* Кнопка бургера */}
//       <div onClick={() => setOpen(true)} className={` bg-transparent`}>
//         <Menu
//           colorRendering={isDarkMode ? "white" : "black"}
//           className={`
//             h-5 w-5
//             transition-colors duration-200 ease-in-out
//             // ${isDarkMode ? "text-white" : "text-black"}
//             // ${isDarkMode ? "bg-transparent" : "bg-transparent"}
//           `}
//         />
//       </div>
//
//       {/* Sheet со стилями под dark/light */}
//       <Sheet open={open} onOpenChange={setOpen}>
//         <SheetContent
//           side="left"
//           className={`
//             // ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}
//           `}
//         >
//           <SheetHeader>
//             <SheetTitle>Navigation</SheetTitle>
//           </SheetHeader>
//           {/* Здесь ваши ссылки/элементы меню */}
//           <nav className="flex flex-col gap-4 mt-4">
//             <a href="#section-1" className="underline">
//               Section 1
//             </a>
//             <a href="#section-2" className="underline">
//               Section 2
//             </a>
//             <a href="#section-3" className="underline">
//               Section 3
//             </a>
//             <a href="#section-4" className="underline">
//               Section 4
//             </a>
//           </nav>
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// }
