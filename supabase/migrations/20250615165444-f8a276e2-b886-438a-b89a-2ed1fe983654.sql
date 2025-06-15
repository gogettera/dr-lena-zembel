
-- Grant public read-access to the clinic information table.
-- This allows anyone to view the clinic's details.
CREATE POLICY "Allow public read access to clinic_info"
ON public.clinic_info
FOR SELECT
USING (true);

-- Grant public read-access to the doctor information table.
-- This allows anyone to view the doctor's profile.
CREATE POLICY "Allow public read access to doctor_info"
ON public.doctor_info
FOR SELECT
USING (true);
