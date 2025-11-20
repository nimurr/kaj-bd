import { useEffect, useState } from "react";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { IoLocationSharp, IoTime } from "react-icons/io5";
import { SiCcleaner } from "react-icons/si";
import { Link, useParams } from "react-router-dom";
import { useGetCompletedProviderDetailsQuery, useGetCompletedUserDetailsQuery, useGetFullNotCompletedWorkTrakerQuery } from "../../redux/features/WorkTraker/workTraker";
import moment from "moment";
import Url from "../../redux/baseApi/forImageUrl";
import { Image } from "antd";

const workData = {
    status: "Cancelled",
    bookingDateTime: "Jun 17, 2025 09:31AM",
    duration: "Jun 17, 2025  09:31AM",
    completionDateTime: "Jun 18, 2025 09:31AM",
    address: "Rampura Dhaka, Bangladesh",
    proofImage: "/image/floor.png",
    services: [
        {
            name: "Home cleaning",
            startPrice: 30.9,
            otherParts: 500,
            totalCost: 530.9,
        },
    ],
    user: {
        name: "Bashar Islam",
        email: "support@gmail.com",
        phone: "1233333333",
        gender: "Male",
        dob: "11-11-1999",
        address: "Rangpur Bangladesh",
        workType: "Home cleaning",
        rating: 4.5,
        image:
            "https://thumbs.dreamstime.com/b/close-up-portrait-young-indian-man-standing-outside-his-forehead-looking-seriously-camera-301326364.jpg",
    },
    provider: {
        name: "Ripon Mia",
        email: "support@gmail.com",
        phone: "1233333333",
        gender: "Male",
        dob: "11-11-1999",
        address: "Rangpur Bangladesh",
        workType: "Home cleaning",
        experience: "4 Years",
        rating: 4.5,
        image: "https://via.placeholder.com/150",
        nidFront:
            "https://imgv2-1-f.scribdassets.com/img/document/658369930/original/352985ad62/1?v=1",
        nidBack:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/NID_%28Back%29.png/250px-NID_%28Back%29.png",
    },
};

const WorkTrakercancelled = () => {
    const { id } = useParams();
    const { data } = useGetFullNotCompletedWorkTrakerQuery(id);
    const fullCompletedData = data?.data?.attributes?.results[0];

    const [detailsVisible, setDetailsVisible] = useState(false);
    const [viewTarget, setViewTarget] = useState(null);

    const [userId, setUserId] = useState(null);
    const [providerId, setProviderId] = useState(null);

    const { data: userDetailsData } = useGetCompletedUserDetailsQuery(userId);
    const fullUserDetailsData = userDetailsData?.data?.attributes?.results[0];

    const { data: providerDetailsData } = useGetCompletedProviderDetailsQuery(providerId);
    const fullProviderDetailsData = providerDetailsData?.data?.attributes?.results[0];

    const [fullUserDetails, setFullUserDetails] = useState(null);

    console.log(fullUserDetails)

    useEffect(() => {
        if (fullUserDetailsData) {
            setFullUserDetails(fullUserDetailsData);
        } else {
            setFullUserDetails(fullProviderDetailsData);
        }
    }, [fullUserDetailsData, fullProviderDetailsData]);

    const handleShowDetails = (target) => {
        setDetailsVisible(true);
        setViewTarget(target);
        if (target?.role === "user") {
            setUserId(target?._userId)

            setFullUserDetails(null)
            setFullUserDetails(fullUserDetailsData)
        };
        if (target?.role === "provider") {
            setProviderId(target?._userId)
            setFullUserDetails(null)
            setFullUserDetails(fullProviderDetailsData)
        };
    };

    const handleBack = () => {
        setDetailsVisible(false);
        setViewTarget(null);
        setFullUserDetails(null);
    };

    const selectedPerson =
        viewTarget === "user" ? workData.user : workData.provider;

    return (
        <section className={`p-5 ${detailsVisible && "flex gap-5 items-start"}`}>
            {/* Summary Section */}
            <div className="border border-gray-200 p-5 rounded-lg w-full">
                <div className="flex items-center justify-between mb-8">
                    <Link to={'/work-traker'} className="text-3xl font-semibold flex items-center gap-2"><FaArrowLeft /> Work Tracker</Link>
                    <span
                        className={`py-1 px-3 rounded-lg capitalize text-white ${(() => {
                            switch (fullCompletedData?.status) {
                                case 'completed':
                                    return 'bg-green-500'; // Green for completed
                                case 'pending':
                                    return 'bg-yellow-500'; // Yellow for pending
                                case 'cancelled':
                                    return 'bg-red-500'; // Red for cancelled
                                case 'accepted':
                                    return 'bg-blue-500'; // Blue for accepted
                                case 'paymentRequest':
                                    return 'bg-purple-500'; // Purple for payment request
                                case 'inProgress':
                                    return 'bg-orange-500'; // Orange for in progress
                                default:
                                    return 'bg-gray-500'; // Default to gray if status is not matched
                            }
                        })()}
`}

                    >
                        {fullCompletedData?.status}
                    </span>
                </div>

                <h2 className="border p-2 rounded-lg text-xl font-semibold bg-blue-100 mb-5">
                    Services Booking Information
                </h2>

                <div className="border-t-2 border-b-2 border-dashed border-gray-300 my-5 py-2">
                    <h2 className="text-xl font-semibold mb-2">Working Address</h2>
                    <span className="flex items-center gap-2 text-gray-600">
                        <IoLocationSharp className="text-[#778aebe0] text-2xl" /> {fullCompletedData?.address?.en}
                    </span>
                </div>
                <div className="my-5">
                    <h2 className="text-xl font-semibold">Booking Order Date & time</h2>
                    <span className="flex items-center gap-2 text-gray-600">
                        <IoTime className="text-[#778aebe0]" /> {moment(fullCompletedData?.bookingDateTime).format('DD MMM YYYY, h:mm A')}
                    </span>
                </div>

                <h2 className="flex items-center justify-between gap-5 border p-2 rounded-lg bg-blue-100 text-xl font-semibold">
                    <span className="flex items-center gap-2">
                        <SiCcleaner className="text-[#778aebe0]" /> Start Price
                    </span>
                    <span>
                        <span className="text-[#778aebe0] text-2xl font-semibold">
                            ৳{fullCompletedData?.startPrice}
                        </span>
                    </span>
                </h2>

                {/* User and Provider */}
                {["user", "provider"].map((role) => {
                    const person = workData[role];
                    const personRole = role === "user" ? fullCompletedData?.userId : fullCompletedData?.providerId;
                    return (
                        <div key={role}>
                            <div
                                className="flex items-center gap-5 my-5 border p-3 rounded-lg cursor-pointer"
                                onClick={() => handleShowDetails(personRole)}
                            >
                                <img
                                    className="w-20 h-20 rounded-full"
                                    src={personRole?.profileImage?.imageUrl.includes('amazonaws') ? personRole.profileImage?.imageUrl : Url + personRole?.profileImage?.imageUrl}
                                    alt={personRole?.name}
                                />
                                <div>
                                    <h2 className="text-2xl font-semibold">{personRole?.name}</h2>
                                    <h2 className="text-xl font-medium text-gray-500">{role === "user" ? "User" : "Provider"}</h2>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Details Drawer */}
            {fullUserDetails && (
                <div className="w-full lg:w-2/5 border-2 border-blue-400 p-4 rounded-lg relative">

                    <div
                        onClick={handleBack}
                        className="absolute bg-[#778aebe0] p-3 rounded-full -top-5 -left-5 cursor-pointer"
                    >
                        <FaArrowLeft className="text-white text-xl" />
                    </div>
                    <div className="flex items-center gap-5 mb-5">
                        <Image
                            className="max-w-20 max-h-20 w-full h-full rounded-full"
                            src={fullUserDetails?.profileImage?.imageUrl.includes('amazonaws') ? fullUserDetails.profileImage?.imageUrl : Url + fullUserDetails?.profileImage?.imageUrl}
                            alt={fullUserDetails?.name}
                        />
                        <div>
                            <h1 className="text-2xl font-semibold">{fullUserDetails?.name}</h1>
                            <span>{fullUserDetails?.role === "user" ? "User" : "Provider"}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <InfoRow label="Name" value={fullUserDetails?.name} />
                        <InfoRow label="Work Type" value={fullUserDetails?.serviceName?.en || "N/A"} />
                        {fullUserDetails.experience && (
                            <InfoRow label="Years of Experience" value={fullUserDetails?.experience || "N/A"} />
                        )}
                        <InfoRow label="Email" value={fullUserDetails?.email} />
                        <InfoRow label="Phone Number" value={fullUserDetails?.phoneNumber || "N/A"} />
                        <InfoRow label="Gender" value={fullUserDetails?.gender || "N/A"} />
                        <InfoRow label="Date of Birth" value={moment(fullUserDetails?.dob).format("DD MMM YYYY")} />
                        <InfoRow label="Address" value={fullUserDetails?.location?.en || "N/A"} />
                    </div>
                </div>
            )}
        </section>
    );
};

const InfoRow = ({ label, value }) => (
    <div className="flex items-center justify-between py-2 border p-2 rounded-lg border-gray-300">
        <span className="font-semibold">{label}</span>
        <span>{value}</span>
    </div>
);

export default WorkTrakercancelled;
