"use client";

import { useEffect, useState } from "react";

export default function useMousePosition() {

    const [mouse, setMouse] = useState({

        x: -9999,

        y: -9999,

    });

    useEffect(() => {

        const move = (e: MouseEvent) => {

            setMouse({

                x: e.clientX,

                y: e.clientY,

            });

        };

        window.addEventListener("mousemove", move);

        return () =>
            window.removeEventListener("mousemove", move);

    }, []);

    return mouse;

}