
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, Award, Microscope } from 'lucide-react';

const TrustBadges: React.FC = () => {
  return (
    <div className="mt-12 text-center">
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <Badge variant="outline" className="border-dental-orange text-dental-orange px-4 py-2">
          <Shield className="h-4 w-4 mr-2" />
          משרד הבריאות
        </Badge>
        <Badge variant="outline" className="border-dental-orange text-dental-orange px-4 py-2">
          <Award className="h-4 w-4 mr-2" />
          האיגוד הישראלי לרפואת שיניים
        </Badge>
        <Badge variant="outline" className="border-dental-orange text-dental-orange px-4 py-2">
          <Microscope className="h-4 w-4 mr-2" />
          טכנולוגיה גרמנית
        </Badge>
      </div>
      <p className="text-xs text-dental-navy/60">
        כל הטיפולים מבוצעים בהתאם לתקני משרד הבריאות והנחיות האיגוד המקצועי
      </p>
    </div>
  );
};

export default TrustBadges;
