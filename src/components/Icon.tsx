import React from 'react';
import cName from 'classnames';


let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('icons', true, /\.svg$/));
} catch (error) {
  console.log(error);
}


type Props = {
  name?: string
} & React.SVGAttributes<SVGElement>
const Icon = (props: Props) => {
  const {name, children, className, ...rest} = props;
  return (
    <svg className={cName('icon',className)} width='1em' height='1em' {...rest}>
      {props.name && <use xlinkHref={'#' + props.name}/>} //方便顶部做左中右布局时提供一个空的位置
    </svg>
  );
};


export default Icon;