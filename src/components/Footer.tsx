
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import { Separator } from './ui/separator';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="w-full bg-white border-t border-gray-100 py-4">
      <Container size="lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-gray-400" />
            <span>© {new Date().getFullYear()} {t('contact.allRightsReserved')}</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              to={`/${language}/privacy-policy`}
              className="hover:text-gray-900 transition-colors"
            >
              {t('navigation.legal.privacyPolicy')}
            </Link>
            <span className="text-gray-300">•</span>
            <Link 
              to={`/${language}/terms-of-service`}
              className="hover:text-gray-900 transition-colors"
            >
              {t('navigation.legal.termsOfService')}
            </Link>
            <span className="text-gray-300">•</span>
            <Link 
              to={`/${language}/accessibility-statement`}
              className="hover:text-gray-900 transition-colors"
            >
              {t('navigation.accessibility.statement')}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
