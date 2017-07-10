import React from 'react';

const styles = {
  arrow: next => ({
    position: 'absolute',
    display: 'inline-block',
    width: '50px',
    heigth: '50px',
    top: 0,
    left: 0,
    transform: next ? 'none' : 'rotate(-180deg)',
  }),
  svg: () => ({
    display: 'inline-block',
    width: '100%',
  }),
};

const DefaultArrow = ({ next }) => {
  return (
    <span
      className="Pagimagic-nav-arrow"
      style={styles.arrow(next)}
    >
      <svg
        x="0px"
        y="0px"
        viewBox="0 0 240.823 240.823"
        style={styles.svg()}
      >
        <g>
          <path 
            d="M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179
		l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261
		C187.881,124.315,187.881,116.495,183.189,111.816z" />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </g>
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
      </svg>
    </span>
  );
};

export default DefaultArrow;
