import React, {FC, useState} from 'react';
import Text_filed from "../../models/Text_filed";
import Button_sm from "../../models/Button_sm";
import axios from "axios";

const Signup: FC = () => {

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const userHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({...newUser, [e.target.name]: e.target.value});
    }

    const createUser = (e: React.SyntheticEvent) => {
        e.preventDefault();
        axios.post("http://localhost:8080/signup", {newUser})
            .then(response => {
                console.log(response)
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <section className="wrapper flex justify-center">
            <div className="h-[78vh] flex justify-center items-center">
                <div>
                    <h2 className="text-center font-bold">Welcome to Jub hunter</h2>
                    <form method="post" className="">
                        <Text_filed
                            type={"text"}
                            name={"name"}
                            onChangeHandler={userHandler}
                            value={newUser.name}
                        />
                        <Text_filed
                            type={"email"}
                            name={"email"}
                            onChangeHandler={userHandler}
                            value={newUser.email}
                        />
                        <Text_filed
                            type={"password"}
                            name={"password"}
                            onChangeHandler={userHandler}
                            value={newUser.password}
                        />
                        <Text_filed
                            type={"password"}
                            name={"confirmPassword"}
                            onChangeHandler={userHandler}
                            value={newUser.confirmPassword}
                        />
                        < Button_sm
                            title={"Sign up"}
                            color={"text-white"}
                            bg_color={"bg-content-blue"}
                            className={"mt-8"}
                            width={"w-full"}
                            onClick={createUser}
                        />
                    </form>
                </div>
            </div>

        </section>
    );
};

export default Signup;
