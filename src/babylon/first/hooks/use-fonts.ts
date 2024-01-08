import { useEffect, useRef, useState } from 'react';

export const useFonts = () => {
    const [fontsReady, setFontsReady] = useState(false);
    const faLoaded = useRef(false);

    useEffect(() => {
        const loadFonts = async () => {
            if (document.fonts.check('16px FontAwesome') === false) {
                await document.fonts.load('16px FontAwesome');
            }

            if (!faLoaded.current) {
                faLoaded.current = true;
                setFontsReady(true);
            }
        };

        loadFonts();
    }, []);

    return { fontsReady };
};
