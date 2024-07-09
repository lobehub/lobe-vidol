import { useTranslation } from 'react-i18next';

interface TranslateProps {
  path: string;
  text: string;
}

const TranslatedComponent = ({ text, path }: TranslateProps) => {
  const { t } = useTranslation(path);
  return t(text);
};

export default TranslatedComponent;
export { TranslatedComponent };
