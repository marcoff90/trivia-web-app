import '../assets/category.scss';

const Category = (props) => {
  const chooseCategory = () => {
    // border around div category container => constant for style
    console.log('chosen')
  }
  return (
      <>
        <div className={'category-container'}
             style={{backgroundColor: props.backgroundColor}}
             onClick={() => chooseCategory()}>
          <p className={'category'}>{props.category}</p>
        </div>
      </>
  );
};

export default Category;
