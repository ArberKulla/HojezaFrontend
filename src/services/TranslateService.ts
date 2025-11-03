import type { TranslationsType } from '../contexts/TranslateContext';

const useTranslateService = () => {
  // const { lang, translations, setTranslations } = useTranslate();

  const readTranslationFile = async (lang: string): Promise<TranslationsType> => {
    const url = `../langs/lang_${lang}.json`;
    // return await HttpClient.get<TranslationsType>(url);

    return new Promise((resolve) => {
      import(`../langs/lang_${lang}.json`)
        .then((module) => {
          const data: TranslationsType = module.default;
          resolve(data);
        })
        .catch(function (error) {
          console.log(error);
          resolve({});
        });
    });
  };

  return { readTranslationFile };
};

export default useTranslateService;
