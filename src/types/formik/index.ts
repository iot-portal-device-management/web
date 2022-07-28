import { FieldMetaProps, FormikErrors } from 'formik/dist/types';

type SetErrors<Values> = (errors: FormikErrors<Values>) => void;
type SetSubmitting = (isSubmitting: boolean) => void;

export interface ActionsProps<Values> {
  setErrors?: SetErrors<Values>;
  setSubmitting: SetSubmitting;
}

export interface TranslationProps {
  key: string;
  values: object;
}

export interface TranslationPropsWithLabel extends TranslationProps {
  label: TranslationProps;
}

export interface TranslationFieldMetaProps<Val> extends Omit<FieldMetaProps<Val>, 'error'> {
  error?: string | TranslationPropsWithLabel;
}
