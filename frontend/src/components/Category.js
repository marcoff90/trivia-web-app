import '../assets/category.scss';

const Category = (props) => {

  return (
      <>
        <div className={'category-container'}
             style={props.style}
             onClick={props.onClick}>
          <p className={'category'}>{props.category}</p>
        </div>
      </>
  );
};

export default Category;
