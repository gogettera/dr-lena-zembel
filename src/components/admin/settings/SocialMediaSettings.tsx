
import React from 'react';
import { useSocialMediaSettingsForm } from "./useSocialMediaSettingsForm";
import SocialMediaSettingsHeader from "./SocialMediaSettingsHeader";
import SocialMediaSettingsForm from "./SocialMediaSettingsForm";

export const SocialMediaSettings = () => {
  const { form, loading, onSubmit } = useSocialMediaSettingsForm();

  return (
    <div>
      <SocialMediaSettingsHeader />
      <SocialMediaSettingsForm form={form} loading={loading} onSubmit={onSubmit} />
    </div>
  );
};
