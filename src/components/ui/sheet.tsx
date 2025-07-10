"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, easeIn, easeOut } from "framer-motion"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg",
  {
    variants: {
      side: {
        top: "inset-x-0 top-16",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 left-0 h-full w-3/4 border-r",
        right: "inset-y-0 right-0 h-full w-3/4 border-l",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => {
  const animationVariants = {
    top: {
      initial: { scaleY: 0 },
      animate: {
        scaleY: 1,
        transition: { duration: 0.4, ease: easeOut },
      },
      exit: {
        scaleY: 0,
        transition: { duration: 0.3, ease: easeIn },
      },
    },
    right: {
      initial: { x: "100%" },
      animate: {
        x: "0%",
        transition: { duration: 0.4, ease: easeOut },
      },
      exit: {
        x: "100%",
        transition: { duration: 0.3, ease: easeIn },
      },
    },
    bottom: {
      initial: { y: "100%" },
      animate: {
        y: "0%",
        transition: { duration: 0.4, ease: easeOut },
      },
      exit: {
        y: "100%",
        transition: { duration: 0.3, ease: easeIn },
      },
    },
    left: {
      initial: { x: "-100%" },
      animate: {
        x: "0%",
        transition: { duration: 0.4, ease: easeOut },
      },
      exit: {
        x: "-100%",
        transition: { duration: 0.3, ease: easeIn },
      },
    },
  }

  return (
    <SheetPrimitive.Content
      ref={ref}
      asChild
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animationVariants[side as keyof typeof animationVariants]}
        className="origin-top"
      >
        {children}
      </motion.div>
    </SheetPrimitive.Content>
  )
})
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
}
