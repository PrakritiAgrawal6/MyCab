/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, ErrorMessage } from 'formik';
  
const FieldBlock: React.FC = ({ label, name, component, children, ...props }: any) => (
<div>
<label className="text-white font-semibold">{label}<span className="text-red-500">*</span></label>
<Field name={name} as={component} {...props}>
     {children}
</Field>
<ErrorMessage name={name} component="div" className="text-red-500" />
</div>
);
export default FieldBlock;