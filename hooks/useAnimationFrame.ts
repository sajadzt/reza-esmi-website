"use client";

import { useEffect } from "react";

export default function useAnimationFrame(
    callback: () => void
) {

    useEffect(() => {

        let frame: number;

        const loop = () => {

            callback();

            frame = requestAnimationFrame(loop);

        };

        frame = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(frame);

    }, [callback]);

}