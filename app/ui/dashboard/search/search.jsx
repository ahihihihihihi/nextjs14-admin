"use client";

import { MdSearch } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import styles from "./search.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";


const Search = ({ placeholder }) => {

    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const [focus, setFocus] = useState(false)
    const [more, setMore] = useState(false)
    const inputRef = useRef()

    const handleClearValueInput = () => {
        setFocus(false)
        inputRef.current.value = ""
        replace(`${pathname}`);
        setMore(false)
    }

    const handleSearch = useDebouncedCallback((e) => {
        const params = new URLSearchParams(searchParams);
        // console.log(">>>check e: ", e.target.value)
        if (e.target.value) {
            if (e.target.value.length === 1) {
                setMore(true)
            } else {
                setMore(false)
            }
            params.set("q", e.target.value);
            setFocus(true)
            replace(`${pathname}?${params}`);

        } else {
            handleClearValueInput()
        }


    }, 500);

    return (
        <div className={`${styles.container} ${focus ? styles.focus : ''}`}>
            <MdSearch />
            <input
                type="text"
                placeholder={placeholder}
                className={`${styles.input}`}
                onChange={(e) => handleSearch(e)}
                ref={inputRef}
            />
            {more &&
                <span style={{ color: "var(--textSoft)" }}>
                    more letters...
                </span>
            }
            {focus &&
                <span onClick={() => handleClearValueInput()}>
                    <VscChromeClose
                        style={{ color: 'red', display: 'block' }}
                    />
                </span>
            }
        </div>
    );
};

export default Search;