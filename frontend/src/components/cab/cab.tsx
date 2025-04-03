/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { handleCabValidation } from '../validations';
import { CabRequest, IBooking } from '../interface';
import { useDispatch, useSelector } from 'react-redux';
import { addBookings } from '../redux/actions/bookingAction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CabApprovalForm: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.user.data.data);
  //User entered data
  const address = data.address;
  const addressString = `${address.street}, ${address.city}, ${address.state}, ${address.zip}`;

  //User entered ph no
  const phone = data.phno;

  //Emp sapid and RM sapid
  const empsapid = data.empsapid;
  const rmsapid = data.rmsapid;

  //Function to handle the submit the booking form
  const handleSubmit = (values: IBooking) => {
    console.log(values)
    const bookingData: any = {
      ...values,
      status: 'Pending', // Default status
      booking_id: `REQ_${Math.floor(Math.random() * 1000000)}` // Generating a random booking ID
    };
    dispatch(addBookings(bookingData));
  };

    // Initial values for the form fields
  const initialValues: CabRequest = {
    pickupLocation: '',
    dropLocation: addressString,
    date: '',
    startTime: '20:00',
    endTime: '',
    reason: '',
    mobileNumber: phone,
    cabType: 'night cab',
    frequency: 'single',
    projectCode: '',
    approver: '',
    rmsapid: rmsapid,
    empsapid: empsapid
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-xl mt-4">
        <Formik
          initialValues={initialValues}
          validationSchema={handleCabValidation}
          onSubmit={(values: any, { resetForm }) => {
            console.log(values);
            handleSubmit(values);
            toast.success("Booking request submitted!");
            resetForm(); // Clear the form data
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Pickup Location<span className="text-red-500">*</span></label>
                  <Field as="select" name="pickupLocation" className="w-full p-3 rounded bg-gray-100 border border-gray-300">
                    <option value="">Select pickup location</option>
                    <option value="BengaluruSEZ-T1-U1-G,1,2(ex 3),3(ex 1B), GFloor, Block 2B Hibiscus, T3">BengaluruSEZ-T1-U1-G,1,2(ex 3),3(ex 1B)</option>
                    <option value="EBC (Whitefield) Pvt Ltd">GFloor, Block 2B Hibiscus, T3 EBC (Whitefield) Pvt Ltd</option>
                    <option value="Cessna Business park, F1,2 Kadubeesanahalli, Bengaluru">Cessna Business park, F1,2 Kadubeesanahalli, Bengaluru</option>
                  </Field>
                  <ErrorMessage name="pickupLocation" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Drop Location</label>
                  <p className="text-black">{addressString}</p>
                  <ErrorMessage name="dropLocation" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Frequency<span className="text-red-500">*</span></label>
                  <div role="group" aria-labelledby="frequency-group">
                    <label>
                      <Field type="radio" name="frequency" value="single" className="mr-2" />
                      Single
                    </label>
                    <label className="ml-4">
                      <Field type="radio" name="frequency" value="recurring" className="mr-2" />
                      Recurring
                    </label>
                  </div>
                  <ErrorMessage name="frequency" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Date<span className="text-red-500">*</span></label>
                  <Field type="date" name="date" className="w-full p-3 rounded bg-gray-100 border border-gray-300" />
                  <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Start Time<span className="text-red-500">*</span></label>
                  <div role="group" aria-labelledby="startTime-group">
                    <label>
                      <Field type="radio" name="startTime" value="20:00" className="mr-2" />
                      8 PM
                    </label>
                    <label className="ml-4">
                      <Field type="radio" name="startTime" value="22:00" className="mr-2" />
                      10 PM
                    </label>
                  </div>
                  <ErrorMessage name="startTime" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Reason<span className="text-red-500">*</span></label>
                  <Field as="select" name="reason" className="w-full p-3 rounded bg-gray-100 border border-gray-300">
                    <option value="">Select a reason</option>
                    <option value="Airport Pickup">Airport Pickup</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Client Visit">Client Visit</option>
                    <option value="Visa Process Movements">Visa Process Movements</option>
                  </Field>
                  <ErrorMessage name="reason" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Cab Type:<span className="text-red-500">*</span></label>
                  <Field as="select" name="cabType" className="w-full p-3 rounded bg-gray-100 border border-gray-300">
                    <option value="night cab">Night Cab</option>
                  </Field>
                  <ErrorMessage name="cabType" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Mobile Number:<span className="text-red-500">*</span></label>
                  <p className="text-black">{phone}</p>
                  <ErrorMessage name="mobileNumber" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Project/RCC Code/Cost Center:<span className="text-red-500">*</span></label>
                  <Field as="select" name="projectCode" className="w-full p-3 rounded bg-gray-100 border border-gray-300">
                    <option value="">Select project code</option>
                    <option value="project1">98-APPS&SI DEL - Europe DI - EU DI - TMT</option>
                    <option value="project2">Bayer-Consulting_RT (20250317 To 20250320)</option>
                    <option value="project3">Europe_DI_Training (20250217 To 20250316)</option>
                  </Field>
                  <ErrorMessage name="projectCode" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Approver:<span className="text-red-500">*</span></label>
                  <Field as="select" name="approver" className="w-full p-3 rounded bg-gray-100 border border-gray-300">
                    <option value="">Select approver</option>
                    <option value="Radha Nanjundaswamy">Radha Nanjundaswamy(51422999)</option>
                  </Field>
                  <ErrorMessage name="approver" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
              <ToastContainer />
              <div className="flex justify-center gap-2 mt-4">
  <button type="reset" className="py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-500">Discard</button>
  <button type="submit" className="py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-500">Submit</button>
</div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CabApprovalForm;