import { useCallback, useEffect, useRef, useState } from "react"

export function useSticky(offset?: number) {
    const ref = useRef<HTMLDivElement>(null)

    const [isSticky, setIsSticky] = useState(false)
    const [offsetTop,setOffsetTop] = useState<number | undefined>(undefined)

    const handleScroll = useCallback(() => {
        if(!offsetTop) return
        const top = window.scrollY
        setIsSticky(top > offsetTop - (offset||0))
    }, [offset, offsetTop])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [handleScroll])

    useEffect(() => {
      if(!ref?.current && offsetTop) return
      setOffsetTop(ref.current?.getBoundingClientRect().top || 0)
    }, [ref,offsetTop])
    

    return {ref, isSticky}
}