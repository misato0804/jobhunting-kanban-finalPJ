import React, {useState} from 'react';
import Button_sm from "../../components/models/Button_sm";
import Text_field_lg from "../../components/models/Text_field_lg";
import InputField from "../../components/models/InputField";
import {BsBuilding} from "react-icons/bs"
import {useCompanyContext} from "../../components/context/companyContext";
import {Company} from "../../types/Company";
import GooglePlace from "../../components/features/user/GooglePlace";


type modalProps = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompanyModal = ({showModal, setShowModal}: modalProps) => {
    const {createCompany} = useCompanyContext();
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [location, setLocation] = useState<{}>()
    const [companyData, setCompanyData] = useState<Company>({
        company_id: "",
        name: "",
        size: "1-10",
        link: "",
        location,
        jobTitle: "",
        salary: "",
        description: "",
        status: 0,
        interest: 0
    })

    const employeesList = [
        "1-10", "11-50", "51-200", "201-500", "501-1,000", "1,001-5,000", "5,001-10,000", "10,000-"
    ]

    const companyDataHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setCompanyData({...companyData, [e.target.name]: e.target.value});
    }

    const sendCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // createCompany(companyData)
        setShowModal(false)
    }

    return (
        <div className="bg-modal">
            <div className="modal-container wrapper py-6">
                <div className="flex items-center">
                    <BsBuilding size={20} className="mr-4"/>
                    <h1 className="text-lg font-bold">Add company</h1>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-8">
                    <InputField
                        type={"text"}
                        title={"company name"}
                        name={"name"}
                        value={companyData.name}
                        placeholder={"company name"}
                        onChange={companyDataHandler}
                    />
                    <div>
                        <InputField
                            type={"text"}
                            title={"job title"}
                            name={"jobTitle"}
                            value={companyData.jobTitle}
                            placeholder={"job title"}
                            onChange={companyDataHandler}
                        />

                    </div>
                </div>
                <InputField
                    type={"text"}
                    title={"job post link"}
                    name={"link"}
                    value={companyData.link}
                    placeholder={"job post link"}
                    onChange={companyDataHandler}
                />

                <div className="grid grid-cols-2 gap-2">
                    <InputField
                        type={"text"}
                        title={"salary"}
                        name={"salary"}
                        value={companyData.salary}
                        placeholder={"salary"}
                        onChange={companyDataHandler}
                    />
                    <div>
                        <InputField
                            type={"text"}
                            title={"company size"}
                            name={"size"}
                            value={companyData.size}
                            placeholder={"company size"}
                            onChange={companyDataHandler}
                        />
                    </div>
                </div>
                <Text_field_lg
                    name={"description"}
                    onChange={companyDataHandler}
                />
                <GooglePlace
                    location={location}
                    companyData={companyData}
                    setLocation={setLocation}
                    setCompanyData = {setCompanyData}

                />
                <div className="flex justify-end gap-2 mt-4">
                    <Button_sm
                        title={"create"}
                        color={"text-white"}
                        bg_color={"bg-content-blue"}
                        width={"w-24"}
                        onClick={sendCompany}
                    />
                    <Button_sm
                        title={"close"}
                        color={"bg-content-blue"}
                        bg_color={"bg-white"}
                        width={"w-24"}
                        onClick={() => setShowModal(false)}
                        className={"border-2"}
                    />
                </div>
            </div>
        </div>
    );
};

export default CompanyModal;