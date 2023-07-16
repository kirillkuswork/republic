import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './LocationMap.module.scss';

export interface ILocationMap {}

const LocationMap: React.FC<ILocationMap> = () => {
    const mapRef = useRef<HTMLElement | null>(null);
    const isMapInView = useInView(mapRef, { once: true, amount: 0.6 });

    return (
        <motion.section className={styles.wrapper} ref={mapRef}>
            <motion.div className={styles.map} style={{ scale: isMapInView ? 1 : 1.1 }} />
            <motion.div className={styles.mapMobile} style={{ scale: isMapInView ? 1 : 1.1 }} />
        </motion.section>
    );
};

export default LocationMap;
