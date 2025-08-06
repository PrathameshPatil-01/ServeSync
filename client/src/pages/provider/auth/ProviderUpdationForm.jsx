import ProviderAuthLayout from '@/layouts/ProviderAuthLayout.jsx';
import { registerProvider } from '@/redux/provider/providerThunks';
import {
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Shared field component to reduce boilerplate
function TextFieldWrapper({ name, label, type = 'text', formikProps, ...rest }) {
    const { values, handleChange, handleBlur, touched, errors } = formikProps;
    return (
        <TextField
            name={name}
            label={label}
            type={type}
            fullWidth
            value={values[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched[name] && Boolean(errors[name])}
            helperText={touched[name] && errors[name]}
            {...rest}
        />
    );
}

function MultiSelectDays({ formikProps }) {
    const { values, setFieldValue, touched, errors } = formikProps;
    return (
        <FormControl fullWidth error={touched.availableDays && Boolean(errors.availableDays)}>
            <InputLabel>Availability Days</InputLabel>
            <Select
                multiple
                value={values.availableDays}
                onChange={(e) => setFieldValue('availableDays', e.target.value)}
                input={<OutlinedInput label="Available Days" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
            >
                {days.map((day) => (
                    <MenuItem key={day} value={day}>
                        {day}
                    </MenuItem>
                ))}
            </Select>
            {touched.availableDays && errors.availableDays && (
                <Typography variant="caption" color="error">
                    {errors.availableDays}
                </Typography>
            )}
        </FormControl>
    );
}

// Validation
const fullSchema = Yup.object({
    businessName: Yup.string().required('Business name is required'),
    fullName: Yup.string().required('Full name is required'),
    aadharNumber: Yup.string().length(12, 'Must be 12 digits').required('Aadhar is required'),
    panNumber: Yup.string().length(10, 'Must be 10 characters').required('PAN is required'),
    gstNumber: Yup.string().length(15, 'Must be 15 characters').required('GST is required'),
    yearsOfExperience: Yup.number().min(0, 'Must be non-negative').required('Required'),
    bio: Yup.string().max(1000, 'Max 1000 characters'),
    serviceAreaRadiusKm: Yup.number().min(1, 'Minimum 1 km').required('Required'),
    availableDays: Yup.array().min(1, 'Select at least one day'),
    availableTimeStart: Yup.string().required('Required'),
    availableTimeEnd: Yup.string().required('Required'),
});

// Step-specific schemas for gating
const stepSchemas = [
    // Step 0: Business + Personal
    Yup.object({
        businessName: fullSchema.fields.businessName,
        fullName: fullSchema.fields.fullName,
        aadharNumber: fullSchema.fields.aadharNumber,
        panNumber: fullSchema.fields.panNumber,
        gstNumber: fullSchema.fields.gstNumber,
    }),
    // Step 1: Bio / Experience / Availability
    Yup.object({
        bio: fullSchema.fields.bio,
        yearsOfExperience: fullSchema.fields.yearsOfExperience,
        serviceAreaRadiusKm: fullSchema.fields.serviceAreaRadiusKm,
        availableDays: fullSchema.fields.availableDays,
        availableTimeStart: fullSchema.fields.availableTimeStart,
        availableTimeEnd: fullSchema.fields.availableTimeEnd,
    }),
];

const steps = ['Business & Identity', 'Experience & Availability'];

export default function ProviderUpdationForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, success, error } = useSelector((state) => state.provider);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (success) navigate('/dashboard');
    }, [success, navigate]);

    const isLastStep = activeStep === steps.length - 1;

    const initialValues = useMemo(
        () => ({
            businessName: '',
            fullName: '',
            aadharNumber: '',
            panNumber: '',
            gstNumber: '',
            bio: '',
            yearsOfExperience: 0,
            serviceAreaRadiusKm: 10,
            availableDays: [],
            availableTimeStart: '',
            availableTimeEnd: '',
        }),
        []
    );

    const handleNext = useCallback(async (validateForm, setTouched) => {
        const errors = await validateForm();
        // mark current step fields as touched to show errors
        const fieldsInStep = Object.keys(stepSchemas[activeStep].fields);
        setTouched(
            fieldsInStep.reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {})
        );
        const hasError = fieldsInStep.some((f) => errors[f]);
        if (!hasError) setActiveStep((s) => s + 1);
    }, [activeStep]);

    return (
        <ProviderAuthLayout title="Register as a Provider">
            <Box maxWidth={700} mx="auto" px={2}>
                {/* <Typography variant="h5" mb={2}>
          Register as a Provider
        </Typography> */}

                <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Formik
                    initialValues={initialValues}
                    validationSchema={fullSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            await dispatch(registerProvider(values)).unwrap();
                            // navigation handled in useEffect
                        } catch {
                            // error displayed from redux state
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {(formik) => {
                        const {
                            validateForm,
                            setTouched,
                            isSubmitting,
                            handleSubmit,
                        } = formik;

                        // Determine if current step is valid (optional: to enable/disable next)
                        {/* const currentStepSchema = stepSchemas[activeStep]; */ }

                        return (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Box display="flex" flexDirection="column" gap={3}>
                                    {error && (
                                        <Typography color="error" fontSize="0.9rem">
                                            {error}
                                        </Typography>
                                    )}

                                    {activeStep === 0 && (
                                        <>
                                            <TextFieldWrapper name="businessName" label="Business Name" formikProps={formik} />
                                            <TextFieldWrapper name="fullName" label="Full Name" formikProps={formik} />
                                            <TextFieldWrapper name="aadharNumber" label="Aadhar Number" formikProps={formik} />
                                            <Box display="flex" gap={2}>
                                                <TextFieldWrapper name="panNumber" label="PAN Number" formikProps={formik} />
                                                <TextFieldWrapper name="gstNumber" label="GST Number" formikProps={formik} />
                                            </Box>
                                        </>
                                    )}

                                    {activeStep === 1 && (
                                        <>
                                            <TextFieldWrapper
                                                name="bio"
                                                label="Short Bio"
                                                multiline
                                                rows={3}
                                                formikProps={formik}
                                            />
                                            <Box display="flex" gap={2}>
                                                <TextFieldWrapper
                                                    name="yearsOfExperience"
                                                    label="Years of Experience"
                                                    type="number"
                                                    formikProps={formik}
                                                />
                                                <TextFieldWrapper
                                                    name="serviceAreaRadiusKm"
                                                    label="Service Area Radius (Km)"
                                                    type="number"
                                                    formikProps={formik}
                                                />
                                            </Box>
                                            <MultiSelectDays formikProps={formik} />
                                            <Box display="flex" gap={2}>
                                                <TextFieldWrapper
                                                    name="availableTimeStart"
                                                    label="Start Time"
                                                    type="time"
                                                    formikProps={formik}
                                                    InputLabelProps={{ shrink: true }}
                                                />
                                                <TextFieldWrapper
                                                    name="availableTimeEnd"
                                                    label="End Time"
                                                    type="time"
                                                    formikProps={formik}
                                                    InputLabelProps={{ shrink: true }}
                                                />
                                            </Box>
                                        </>
                                    )}

                                    <Box display="flex" justifyContent="space-between" mt={1}>
                                        {activeStep > 0 ? (
                                            <Button
                                                variant="outlined"
                                                onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                                            >
                                                Back
                                            </Button>
                                        ) : (
                                            <Box />
                                        )}

                                        <Box>
                                            {!isLastStep && (
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleNext(validateForm, setTouched)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Next
                                                </Button>
                                            )}
                                            {isLastStep && (
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    disabled={loading || isSubmitting}
                                                >
                                                    {loading || isSubmitting ? 'Submitting...' : 'Complete Registration'}
                                                </Button>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </Form>
                        );
                    }}
                </Formik>
            </Box>
        </ProviderAuthLayout>
    );
}
