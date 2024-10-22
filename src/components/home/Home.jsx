import {useRef, useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import {useFormik} from "formik";
import axios from "axios";
import {TextField, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import Aos from "aos";
import "./stye.scss"

const Home = () => {
    const countdownDate = new Date('2024-10-26');
    const [modal, setModal] = useState(false);
    const nodeRef = useRef(null);
    const [alert, setAlert] = useState(false);
    const [tarif, setTarif] = useState("");
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Required";
        }

        if (!values.tarif) {
            errors.tarif = "Required";
        }

        if (!values.phone) {
            errors.phone = "Required";
        } else if (isNaN(Number(values.phone))) {
            errors.phone = "Required";
        }
        return errors;
    };

    const formOne = useFormik({
        initialValues: {
            name: "",
            phone: "",
            tarif: "",
        },
        validate,
        onSubmit: (values) => {
            let lead = {
                Name: values.name,
                Phone: values.phone,
                Tarif: values.tarif
            };
            setModal(false);
            axios.post(`https://api.sheetbest.com/sheets/27c50558-a521-4d3e-b97e-f7e42c2cae42`, lead)
                .then((response) => {
                    setAlert(true);
                    setTimeout(() => {
                        setAlert(false)
                    }, 3000);
                    formOne.resetForm();
                    setTarif("")
                })
        },
    });

    useEffect(() => {

        Aos.init({duration: 1000});

        const interval = setInterval(() => setNewTime(), 1000);

        if (seconds < 0) {
            clearInterval(interval)
            //Stop the rerun once state.seconds is less than zero
        }
    }, []);


    const setNewTime = () => {
        if (countdownDate) {
            const currentTime = new Date();
            //get current time now in milliseconds
            const distanceToDate = countdownDate - currentTime;
            //get difference dates in milliseconds
            let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
            // get number of days from the difference in dates
            let hours = Math.floor(
                (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            // get number of minutes from the remaining time after removing hours
            let minutes = Math.floor(
                (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
            );
            let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);
            // number of hours from the remaining time after removing seconds

            const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            days = `${days}`;
            if (numbersToAddZeroTo.includes(hours)) {
                hours = `0${hours}`;
            } else if (numbersToAddZeroTo.includes(minutes)) {
                minutes = `0${minutes}`;
            } else if (numbersToAddZeroTo.includes(seconds)) {
                seconds = `0${seconds}`;
            }
            // a logic to add 0 in front of numbers such that 1 will be 01, 2 will be 02, and so on.
            setDays(days)
            setHours(hours)
            setMinutes(minutes)
            setSeconds(seconds)
        }
    };

    return <div className="home-page-wrapper">

        {alert && <div className="alert-box">
            <div className="icon">
                <img src="./images/green.svg" alt=""/>
            </div>
            <div className="text">
                Ma'lumotingiz yuborildi!
            </div>
        </div>}

        <CSSTransition
            in={modal}
            nodeRef={nodeRef}
            timeout={300}
            classNames="alert"
            unmountOnExit
        >
            <div className="modal-sloy">
                <div ref={nodeRef} className="modal-card">
                    <div className="register">
                        <div className="header">
                            <div className="xbtn">
                                <img onClick={() => setModal(false)} src="./images/cancel.png"
                                     alt=""/>
                            </div>
                        </div>
                        <div className="title">
                            Ro'yxatdan o'tish
                        </div>
                        <div className="description">
                            Operatorlar siz bilan aloqaga chiqa olishlari uchun pastdagi maydonlarni to‘g‘ri
                            to‘ldiring!
                        </div>
                        <div className="inputs-box">
                            <TextField error={formOne.errors.name === "Required"}
                                       value={formOne.name}
                                       onChange={formOne.handleChange}
                                       name="name"
                                       sx={{m: 1, minWidth: "100%"}} size="small"
                                       id="outlined-basic"
                                       label="Ism va familiya " variant="outlined" className="textField"/>
                            <TextField
                                error={formOne.errors.phone === "Required"}
                                value={formOne.phone}
                                onChange={formOne.handleChange}
                                name="phone"
                                type="number"
                                sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                label="Telefon raqam " variant="outlined" className="textField"/>

                            <FormControl sx={{m: 1, minWidth: "100%"}} size="small" className="selectMui">
                                <InputLabel id="demo-select-large-label">Tarif</InputLabel>
                                <Select
                                    label={"Tariflar"}
                                    error={formOne.errors.tarif === "Required"}
                                    name="tarif"
                                    labelid="demo-select-small-label"
                                    id="demo-select-small"
                                    value={tarif}
                                    onChange={(e) => {
                                        formOne.handleChange(e)
                                        setTarif(e.target.value)
                                    }}
                                >
                                    <MenuItem value="standart">STANDART</MenuItem>
                                    <MenuItem value="premium">PREMIUM</MenuItem>
                                    <MenuItem value="gold">VIP</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div onClick={() => formOne.handleSubmit()} className="button-register">
                            <div className="button-71">
                                Yuborish
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </CSSTransition>

        <div className="home-page">
            <div className="home-image">
                <div className="header">
                </div>
                <div className="bottom-side">
                    <div className="left-side">
                        <div data-aos="fade-up" className="bottom-text">
                            MEDIA ORQALI KATTA DAROMAD TOPISH
                        </div>

                        <div data-aos="zoom-in" onClick={() => setModal(true)} className="button-register">
                            <div className="animated-button1">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Kursga ro'yxatdan o'tish
                            </div>
                        </div>

                    </div>

                    <div className="right-side">
                        <div className="person-circle">
                            <img className="people-image" src="./images/person.png" alt=""/>
                            <a href="https://t.me/manager_munira" target="_blank" className="button">
                                Maneger bilan bog'lanish
                            </a>
                            <img className="black" src="./images/black.png" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="tarifs-box">
                    <div className="title">
                        Tariflar
                    </div>

                    <div className="des">
                        O'zingizga mos tarifni tanlang
                    </div>

                    <div className="tarifs">
                        <div className="tarif">
                            <div className="sloy">
                                <div className="title-tarif">
                                    STANDART
                                </div>

                                <div className="des-tarif">
                                    Tarif ichiga nimalar kiradi:
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">21 ta modul</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">40 ta darslik</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Darsdan 3 oy foydalanish imkoniyati</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Vakansiyalar guruhi</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Mehmon spikerlar bilan oflayn uchrashuv</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Yakuniy imtixon</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Umumiy chatga gruppa</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Bitiruv kecha</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Sertifikat</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Kurs davomiyligi 2 oy</div>
                                </div>

                                <div className="price1">
                                    <del>2 500 000 SO'M</del>
                                </div>
                                <div className="price2">999 000 SO'M</div>

                                <div onClick={() => setModal(true)} className="button-tarif">
                                    Joy band qilish
                                </div>
                            </div>
                        </div>

                        <div className="tarif">
                            <div className="sloy">
                                <div className="title-tarif">
                                    PREMIUM
                                </div>

                                <div className="des-tarif">
                                    Tarif ichiga nimalar kiradi:
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">31 ta modul</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">60 ta darslik</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Darsdan 6 oy foydalanish imkoniyati</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Mehmon spikerlar</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Bonus darsliklar + Qo'shimcha materiallar</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Vakansiyalar guruhi</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Mehmon spikerlar bilan oflayn uchrashuv</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Munira Raxmatova bilan individual Offline uchrashuv (razbor)
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Vazifalar tekshirilishi hamda kurator tomonidan individual feedbacklar
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Kurator tarafidan qo'shimcha video chatlar
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Munira Raxmatova bilan 2 ta online 3 ta
                                        ofline uchrashuv
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Yakuniy imtihon
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Umumiy chatga gruppa</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Bitiruv oqshomi
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Sertifikat</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Kurs davomiyligi 3 oy
                                    </div>
                                </div>

                                <div className="price1">
                                    <del>4 999 000 SO'M</del>
                                </div>
                                <div className="price2">3 499 000 SO'M</div>

                                <div onClick={() => setModal(true)} className="button-tarif">
                                    Joy band qilish
                                </div>
                            </div>
                        </div>
                        <div className="tarif">
                            <div className="sloy">
                                <div className="title-tarif">
                                    VIP
                                </div>

                                <div className="des-tarif">
                                Tarif ichiga nimalar kiradi:
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">31 ta modul</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">60 ta darslik</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Darsdan 1 yil foydalanish imkoniyati</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Mehmon spikerlar</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Bonus darsliklar + Qo'shimcha materiallar</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Vakansiyalar guruhi</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Mehmon spikerlar bilan oflayn uchrashuv</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Munira Raxmatova bilan individual Offline uchrashuv (razbor)
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Guruhlar ichida workshoplar + kurator bilan
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Munira Raxmatova tomonidan vazifalar
                                        tekshirilishi hamda individual feadbacklar
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Munira Raxmatova Tomonidan video chatlar
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Munira Raxmatova bilan 5 ta ofline uchrashuv
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Yakuniy imtihon
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Umumiy chatga gruppa</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Bitiruv oqshomi
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Sertifikat</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Kurs davomiyligi 3 oy
                                    </div>
                                </div>

                                <div className="price1">
                                    <del>6 999 000 SO'M</del>
                                </div>
                                <div className="price2">5 399 000 SO'M</div>
                                <div onClick={() => setModal(true)} className="button-tarif">
                                    Joy band qilish
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer">
                        <div className="sloy">
                            <div className="text-time">
                                Chegirma tugashi uchun qolgan vaqt!
                            </div>
                            <div className="container">
                                {
                                    seconds < 0 ?
                                        <div className='counter-timer'> Chegirma tugadi </div>
                                        :
                                        <div className='counter-container'>

                                            <div className='counter-timer-wrapper'>
                                                <div className='counter-timer'>{days || '00'}</div>
                                                <span>Kun</span>
                                            </div>

                                            <div className='counter-timer-wrapper'>
                                                <div className='counter-timer'>:</div>
                                            </div>

                                            <div className='counter-timer-wrapper'>
                                                <div className='counter-timer'>{hours || '00'}</div>
                                                <span>Soat</span>
                                            </div>

                                            <div className='counter-timer-wrapper'>
                                                <div className='counter-timer'>:</div>
                                            </div>
                                            <div className='counter-timer-wrapper'>
                                                <div className='counter-timer'>{minutes || '00'}</div>
                                                <span>Daqiqa</span>
                                            </div>
                                            <div className='counter-timer-wrapper'>
                                                <div className='counter-timer'>:</div>
                                            </div>
                                            <div className='counter-timer-wrapper'>
                                                <div className='counter-timer'>{seconds || '00'}</div>
                                                <span>Soniya</span>
                                            </div>
                                        </div>
                                }

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="home-image-mobile">
                <img className="black2" src="./images/black2.png" alt=""/>
                <div className="header">
                </div>

                <div className="bottom-side">
                    <div className="person-circle">
                        <div data-aos="fade-up" className="bottom-text">
                            MEDIA ORQALI KATTA DAROMAD TOPISH
                        </div>
                        <img data-aos="zoom-out-up" className="people-image" src="./images/person.png" alt=""/>
                        <div className="button-register">
                            <a onClick={() => setModal(true)} className="animated-button1">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Kursga ro'yxatdan o'tish
                            </a>
                        </div>
                        <img className="black" src="./images/black3.png" alt=""/>
                    </div>
                </div>

                <div className="bottom-mobile">
                    <div className="title">
                        Tariflar
                    </div>

                    <div className="des">
                        O'zingizga mos tarifni tanlang
                    </div>

                    <div className="tarifs">
                        <div className="tarif">
                            <div className="sloy">
                                <div className="title-tarif">
                                    STANDART
                                </div>

                                <div className="des-tarif">
                                    Tarif ichiga nimalar kiradi:
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">21 ta modul</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">40 ta darslik</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Darsdan 3 oy foydalanish imkoniyati</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Vakansiyalar guruhi</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Mehmon spikerlar bilan oflayn uchrashuv</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Yakuniy imtixon</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Umumiy chatga gruppa</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Bitiruv kecha</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Sertifikat</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Kurs davomiyligi 2 oy</div>
                                </div>

                                <div className="price1">
                                    <del>2 500 000 SO'M</del>
                                </div>
                                <div className="price2">999 000 SO'M</div>

                                <div onClick={() => setModal(true)} className="button-tarif">
                                    Joy band qilish
                                </div>
                            </div>
                        </div>

                        <div className="tarif">
                            <div className="sloy">
                                <div className="title-tarif">
                                    PREMIUM
                                </div>

                                <div className="des-tarif">
                                    Tarif ichiga nimalar kiradi:
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">31 ta modul</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">60 ta darslik</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Darsdan 6 oy foydalanish imkoniyati</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Mehmon spikerlar</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Bonus darsliklar + Qo'shimcha materiallar</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Vakansiyalar guruhi</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Mehmon spikerlar bilan oflayn uchrashuv</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Munira Raxmatova bilan individual Offline uchrashuv (razbor)
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Vazifalar tekshirilishi hamda kurator tomonidan individual feedbacklar
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Kurator tarafidan qo'shimcha video chatlar
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Munira Raxmatova bilan 2 ta online 3 ta
                                        ofline uchrashuv
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Yakuniy imtihon
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Umumiy chatga gruppa</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Bitiruv oqshomi
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Sertifikat</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Kurs davomiyligi 3 oy
                                    </div>
                                </div>

                                <div className="price1">
                                    <del>4 999 000 SO'M</del>
                                </div>
                                <div className="price2">3 499 000 SO'M</div>

                                <div onClick={() => setModal(true)} className="button-tarif">
                                    Joy band qilish
                                </div>
                            </div>
                        </div>
                        <div className="tarif">
                            <div className="sloy">
                                <div className="title-tarif">
                                    VIP
                                </div>

                                <div className="des-tarif">
                                    Tarif ichiga nimalar kiradi:
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">31 ta modul</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">60 ta darslik</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Darsdan 1 yil foydalanish imkoniyati</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Mehmon spikerlar</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Bonus darsliklar + Qo'shimcha materiallar</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Vakansiyalar guruhi</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Mehmon spikerlar bilan oflayn uchrashuv</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Munira Raxmatova bilan individual Offline uchrashuv (razbor)
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Guruhlar ichida workshoplar + kurator bilan
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Munira Raxmatova tomonidan vazifalar
                                        tekshirilishi hamda individual feadbacklar
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Munira Raxmatova Tomonidan video chatlar
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Munira Raxmatova bilan 5 ta ofline uchrashuv
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Yakuniy imtihon
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Umumiy chatga gruppa</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Bitiruv oqshomi
                                    </div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">Sertifikat</div>
                                </div>

                                <div className="tarif-item">
                                    <div className="icon">
                                        <img src="./images/check.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        Kurs davomiyligi 3 oy
                                    </div>
                                </div>

                                <div className="price1">
                                    <del>6 999 000 SO'M</del>
                                </div>
                                <div className="price2">5 399 000 SO'M</div>
                                <div onClick={() => setModal(true)} className="button-tarif">
                                    Joy band qilish
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="button-mobile">
                        <a href="https://t.me/manager_munira" target="_blank" className="button">
                            Maneger bilan bog'lanish
                        </a>
                    </div>

                    <div className="footer">
                        <div className="sloy">
                            <div className="text-time">
                                Chegirma tugashi uchun qolgan vaqt!
                            </div>
                            <div className="container">
                                {
                                    seconds < 0 ?
                                        <div className='counter-timer'> Chegirma tugadi </div>
                                        :
                                        <div className='counter-container'>

                                            <div className='counter-timer-wrapper'>
                                                <div className='counter-timer'>{days || '00'}</div>
                                                <span>Kun</span>
                                            </div>

                                            <div className='counter-timer-wrapper'>
                                                <div className='counter-timer'>:</div>
                                            </div>

                                            <div className='counter-timer-wrapper'>
                                                <div className='counter-timer'>{hours || '00'}</div>
                                                <span>Soat</span>
                                            </div>

                                            <div className='counter-timer-wrapper'>
                                                <div className='counter-timer'>:</div>
                                            </div>
                                            <div className='counter-timer-wrapper'>
                                                <div className='counter-timer'>{minutes || '00'}</div>
                                                <span>Daqiqa</span>
                                            </div>
                                            <div className='counter-timer-wrapper'>
                                                <div className='counter-timer'>:</div>
                                            </div>
                                            <div className='counter-timer-wrapper'>
                                                <div className='counter-timer'>{seconds || '00'}</div>
                                                <span>Soniya</span>
                                            </div>
                                        </div>
                                }

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
};

export default Home