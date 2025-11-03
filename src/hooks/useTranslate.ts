import { TranslateContext } from "../contexts/TranslateContext";
import { useContext } from "react"

export const useTranslate = () => {
    const context = useContext(TranslateContext)
    if (!context) throw new Error("useTranslate must be used inside TranslateProvider");

    return context;
}