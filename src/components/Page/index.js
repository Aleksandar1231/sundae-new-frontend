import React, {Suspense} from 'react';
import useEagerConnect from "../../hooks/useEagerConnect";
import Nav from "../Nav";
import Preloader from "../Preloader";
import KModal from "../KModal";
import Modal from "../Modal";
import styles from '../../App.module.scss';


const Page = ({children}) => {
    useEagerConnect();

    return (
        <>
            <Nav/>
            <Suspense
                fallback={
                    <div className={styles.preloader}>
                        {/*<Preloader/>*/}
                    </div>
                }
            >
                {children}
            </Suspense>
            <KModal/>
            <Modal/>
        </>
    );
};

export default Page;