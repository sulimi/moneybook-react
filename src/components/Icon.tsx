import React from 'react';
import camelcase from 'camelcase';


let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('icons', true, /\.svg$/));
} catch (error) {
  console.log(error);
}


type Props = {
  name?: string
} & React.SVGAttributes<SVGAElement>
const Icon = (props: Props) => {
  const {name, children, className, ...rest} = props;
  return (
    <svg className={`icon ${className ? className : ''}`} width='1em' height='1em'>
      {props.name && <use xlinkHref={'#' + props.name}/>} //方便顶部做左中右布局时提供一个空的位置
    </svg>
  );
};


export default Icon;