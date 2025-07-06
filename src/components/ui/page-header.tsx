
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';


interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  background?: 'none' | 'light' | 'gradient' | 'beige' | 'navy';
  centered?: boolean;
  animated?: boolean;
  decorative?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  action,
  background = 'gradient',
  centered = false,
  animated = true,
  decorative = true,
  className,
}: PageHeaderProps) {
  const { t, language, isRTL } = useLanguage();
  
  const backgroundClasses = {
    none: '',
    light: 'bg-white',
    gradient: 'bg-gradient-to-br from-dental-beige/20 via-white to-dental-pink/10',
    beige: 'bg-dental-beige/20',
    navy: 'bg-dental-navy text-white'
  };

  return (
    <header 
      className={cn(
        "py-10 md:py-16 relative overflow-hidden",
        backgroundClasses[background],
        className
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {decorative && (
        <>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-dental-accent/10 rounded-full blur-3xl" aria-hidden="true"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-dental-pink/20 rounded-full blur-3xl" aria-hidden="true"></div>
        </>
      )}
      
      <Container centered={centered} className="relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb className={cn("mb-6", animated && "opacity-0 animate-[fade-in_0.5s_ease-out_forwards]")}>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-dental-navy/70 hover:text-dental-orange">
                    {t('home', 'Home')}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink asChild>
                        <Link 
                          to={crumb.href} 
                          className="text-dental-navy/70 hover:text-dental-orange"
                        >
                          {crumb.label}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <span className="text-dental-orange font-medium">{crumb.label}</span>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
        
        <div className="space-y-4">
          <h1 
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold relative inline-block",
              background === 'navy' ? 'text-white' : 'text-dental-navy',
              animated && "opacity-0 animate-[fade-in_0.5s_ease-out_0.1s_forwards]"
            )}
          >
            {title}
            {decorative && (
              <span className="absolute -right-6 -top-6 text-dental-orange" aria-hidden="true">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </span>
            )}
          </h1>
          
          {description && (
            <p 
              className={cn(
                "text-lg md:text-xl max-w-3xl", 
                background === 'navy' ? 'text-white/90' : 'text-dental-navy/80',
                animated && "opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]"
              )}
            >
              {description}
            </p>
          )}
          
          {action && (
            <div className={cn("pt-4", animated && "opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]")}>
              {action.href ? (
                <Button 
                  asChild
                  variant={background === 'navy' ? 'outline' : 'orange'} 
                  className="rounded-full"
                >
                  <Link to={action.href}>
                    {action.icon}
                    {action.label}
                  </Link>
                </Button>
              ) : (
                <Button 
                  variant={background === 'navy' ? 'outline' : 'orange'} 
                  className="rounded-full"
                  onClick={action.onClick}
                >
                  {action.icon}
                  {action.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
