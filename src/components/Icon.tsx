import React from 'react';


let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('icons', true, /\.svg$/));
} catch (error) {
  console.log(error);
}


type Props = {
  name?: string
}
const Icon = (props: Props) => {
  return (
    <svg className="icon">
      {props.name && <use xlinkHref={'#' + props.name}/>} //方便顶部做左中右布局时提供一个空的位置
    </svg>
  );
};


export default Icon;