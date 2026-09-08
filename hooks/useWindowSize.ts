"use client";

import { useEffect, useState } from "react";

export default function useWindowSize() {

    const [size, setSize] = useState({

        width: 0,

        height: 0,

    });

    useEffect(() => {

        const resize = () => {

            setSize({

                width: window.innerWidth,

                height: window.innerHeight,

            });

        };

        resize();

        window.addEventListener("resize", resize);

        return () =>
            window.removeEventListener("resize", resize);

    }, []);

    return size;

}