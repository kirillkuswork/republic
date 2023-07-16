import React, { RefObject, useRef, useState } from 'react';
import styles from './CookieModal.module.scss';
import Link from 'next/link';
import SimpleButton from '../../../features/buttons/simple-button/SimpleButton';
import { handleNewUser } from '../../../../store/slices/mainSlice';
import { useAppDispatch } from '../../../../hook';
import { setCookie } from '../../../../tools/set-cookie';
import { motion } from 'framer-motion';

const variants = {
	hidden: {
		opacity: 0,
		bottom: '-2.5vw',
	},
	visible: {
		opacity: 1,
		bottom: '2.5vw',
    },
};

const CookieModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const newUserName = 'republic_user';
	const newUserDate =
		new Date().toLocaleDateString() + '/' + new Date().getHours() + '/' + new Date().getMinutes() + '/' + new Date().getSeconds();

	const handleFuction = () => {
		setCookie(newUserName, newUserDate, 365);
		dispatch(handleNewUser({ isANewUser: 'new', value: true }));
    };

	return (
		<motion.div
			className={styles.container}
			variants={variants}
			initial='hidden'
			animate='visible'
			exit='hidden'
            transition={{ duration: 0.3, type: 'tween' }}
        >
			<p className={styles.text}>
				Нажимая на эту кнопку, вы соглашаетесь с нашей&nbsp;
				<Link href={`/policy`} className={styles.policy}>
					политикой конфиденциальности&nbsp;
				</Link>
				и даете согласие на обработку персональных данных
			</p>
			<div className={styles.wrapper}>
                <SimpleButton color='light-brick' outline size='medium' text='CОГЛАСЕН' type='button' width='100%' func={handleFuction} />
			</div>
		</motion.div>
	);
};

export default CookieModal;
