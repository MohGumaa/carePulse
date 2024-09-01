'use client';

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { E164Number } from 'libphonenumber-js/core';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { FormFieldType } from './forms/PatientForm';
import Image from 'next/image';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from './ui/checkbox';


type CustomFormFieldProps = {
	control: Control<any>;
	name: string;
	label?: string;
	placeholder?: string;
	iconSrc?: string;
	iconAlt?: string;
	disabled?: boolean;
	dateFormat?: string;
	showTimeSelect?: boolean;
	children?: React.ReactNode;
	renderSkeleton?: (field: any) => React.ReactNode; // Loading status
	fieldType: FormFieldType;
};

type RenderFieldProps = {
	field: any;
	props: CustomFormFieldProps;
};

const RenderField = ({ field, props }: RenderFieldProps) => {
	const {
		fieldType,
		iconSrc,
		iconAlt,
		placeholder,
		showTimeSelect,
		dateFormat,
		renderSkeleton,
		children,
		disabled,
		name,
		label,
	} = props;

	switch (fieldType) {
		case FormFieldType.INPUT:
			return (
				<div className="flex rounded-md border border-dark-500 bg-dark-400">
					{iconSrc && (
						<Image
							src={iconSrc}
							alt={iconAlt || 'icon'}
							width={24}
							height={24}
							className="ml-2"
						/>
					)}
					<FormControl>
						<Input
							placeholder={placeholder}
							{...field}
							className="shad-input border-0"
						/>
					</FormControl>
				</div>
			);
		case FormFieldType.TEXTAREA:
			return (
				<FormControl>
					<Textarea
						placeholder={placeholder}
						{...field}
						className="shad-textArea"
						disabled={disabled}
					/>
				</FormControl>
			);
		case FormFieldType.PHONE_INPUT:
			return (
				<FormControl>
					<PhoneInput
						defaultCountry="US"
						placeholder={placeholder}
						international
						withCountryCallingCode
						value={field.value as E164Number | undefined}
						onChange={field.onChange}
						className="input-phone"
					/>
				</FormControl>
			);
		case FormFieldType.CHECKBOX:
			return (
				<FormControl>
					<div className="flex items-center gap-4">
						<Checkbox
							id={name}
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
						<label htmlFor={name} className="checkbox-label">
							{label}
						</label>
					</div>
				</FormControl>
			);
		case FormFieldType.DATE_PICKER:
			return (
				<div className="flex rounded-md border border-dark-500 bg-dark-400">
					<Image
						src="/assets/icons/calendar.svg"
						height={24}
						width={24}
						alt="user"
						className="ml-2"
					/>
					<FormControl>
						<DatePicker
							showTimeSelect={showTimeSelect ?? false}
							selected={field.value}
							onChange={(date) => field.onChange(date)}
							timeInputLabel="Time:"
							dateFormat={dateFormat ?? 'MM/dd/yyyy'}
							wrapperClassName="date-picker"
						/>
					</FormControl>
				</div>
			);
		case FormFieldType.SELECT:
			return (
				<FormControl>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger className="shad-select-trigger">
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent className="shad-select-content">
							{children}
						</SelectContent>
					</Select>
				</FormControl>
			);
		case FormFieldType.SKELETON:
			return renderSkeleton ? renderSkeleton(field) : null;
		default:
			break;
	}
};

const CustomFormField = (props: CustomFormFieldProps) => {
	const { control, fieldType, name, label } = props;

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex-1">
					{fieldType !== FormFieldType.CHECKBOX && label && (
						<FormLabel>{label}</FormLabel>
					)}

					<RenderField field={field} props={props} />
					{/* <FormDescription>This is your public display name.</FormDescription> */}
					<FormMessage className="shad-error" />
				</FormItem>
			)}
		/>
	);
};

export default CustomFormField;
