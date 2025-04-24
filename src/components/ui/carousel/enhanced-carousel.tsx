
import React, { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

type CarouselProps = {
  opts?: any
  plugins?: any[]
  orientation?: "horizontal" | "vertical"
  setApi?: (api: any) => void
  children: React.ReactNode
  className?: string
  autoplay?: number | false
  showArrows?: boolean
  showDots?: boolean
  arrowsInset?: boolean
  arrowsType?: "default" | "light" | "dark" | "circle" | "pill"
}

type CarouselApiType = any

const EnhancedCarousel = ({
  opts,
  plugins,
  orientation = "horizontal",
  setApi,
  children,
  className,
  autoplay = false,
  showArrows = true,
  showDots = true,
  arrowsInset = true,
  arrowsType = "default",
}: CarouselProps) => {
  const { isRTL } = useLanguage()
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { ...opts, direction: isRTL ? "rtl" : "ltr" },
    plugins
  )
  const [slideCount, setSlideCount] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [autoplayInterval, setAutoplayInterval] = useState<NodeJS.Timeout | null>(null)

  // Initialize the carousel
  useEffect(() => {
    if (emblaApi) {
      if (setApi) {
        setApi(emblaApi)
      }

      // Get the slide count
      setSlideCount(emblaApi.slideNodes().length)

      // Set up autoplay
      if (autoplay && typeof autoplay === "number") {
        const interval = setInterval(() => {
          if (emblaApi.canScrollNext()) {
            emblaApi.scrollNext()
          } else {
            emblaApi.scrollTo(0)
          }
        }, autoplay)
        setAutoplayInterval(interval)
      }

      // Handle scroll events
      const onSelect = () => {
        setActiveSlide(emblaApi.selectedScrollSnap())
        setCanScrollPrev(emblaApi.canScrollPrev())
        setCanScrollNext(emblaApi.canScrollNext())
      }

      emblaApi.on("select", onSelect)
      onSelect() // Call once to initialize

      return () => {
        emblaApi.off("select", onSelect)
        if (autoplayInterval) {
          clearInterval(autoplayInterval)
        }
      }
    }
  }, [emblaApi, setApi, autoplay])

  // Update RTL direction when language changes
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit({ ...opts, direction: isRTL ? "rtl" : "ltr" })
    }
  }, [isRTL, emblaApi, opts])

  // Button style variants
  const arrowStyles = {
    default: "bg-white/90 text-gray-800 hover:bg-white shadow-md",
    light: "bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80",
    dark: "bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm",
    circle: "rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-md w-10 h-10 p-2",
    pill: "rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-md"
  }

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev()
  }

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext()
  }

  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }

  return (
    <div className={cn("relative", className)}>
      <div
        ref={emblaRef}
        className="overflow-hidden"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div
          className={cn("flex", {
            "-mr-4": orientation === "horizontal",
            "flex-col": orientation === "vertical",
          })}
        >
          {children}
        </div>
      </div>
      {showArrows && (
        <>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-10 rounded-full",
              arrowsInset ? (isRTL ? "right-2" : "left-2") : (isRTL ? "right-[-20px]" : "left-[-20px]"),
              canScrollPrev ? "flex" : "hidden",
              arrowStyles[arrowsType]
            )}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-10 rounded-full",
              arrowsInset ? (isRTL ? "left-2" : "right-2") : (isRTL ? "left-[-20px]" : "right-[-20px]"),
              canScrollNext ? "flex" : "hidden",
              arrowStyles[arrowsType]
            )}
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            {isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span className="sr-only">Next slide</span>
          </Button>
        </>
      )}
      {showDots && slideCount > 1 && (
        <div className="flex justify-center gap-1 mt-4">
          {Array.from({ length: slideCount }).map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={cn(
                "w-2 h-2 p-0 rounded-full",
                activeSlide === index
                  ? "bg-dental-navy"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Define type for carousel item
type CarouselItemProps = {
  children: React.ReactNode
  className?: string
  index?: number
}

// Export CarouselItem component
const CarouselItem = ({ children, className }: CarouselItemProps) => (
  <div className={cn("min-w-0 shrink-0 grow-0 basis-full px-4", className)}>
    {children}
  </div>
)

export { EnhancedCarousel, CarouselItem }
