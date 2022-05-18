import {useNavigate, useParams} from "react-router-dom";
import UserInfo from "../components/UserInfo";
import {useEffect, useState} from "react";
import AxiosService from "../services/AxiosService";
import Loader from "../components/Loader";
import colors from "../assets/color-scheme.scss";
import '../assets/choose-category.scss';
import Button from "../components/Button";
import {toast} from "react-toastify";
import Category from "../components/Category";
import Auth from "../services/Auth";

const ChooseCategory = () => {
  let username = window.localStorage.getItem('username');
  let avatar = window.localStorage.getItem('avatar');
  let score = window.localStorage.getItem('totalScore');
  let screenWidth = window.innerWidth;
  let duelId = useParams();
  let navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoriesState, setCategoriesState] = useState([
    {id: 1, selected: false},
    {id: 2, selected: false},
    {id: 3, selected: false},
    {id: 4, selected: false},
    {id: 5, selected: false},
    {id: 6, selected: false},
    {id: 7, selected: false},
    {id: 8, selected: false},
    {id: 9, selected: false},
    {id: 10, selected: false},
    {id: 11, selected: false},
    {id: 12, selected: false}
  ]);
  const categoryColors = [
    colors['main-green'],
    colors['main-red'],
    colors['main-blue'],
    colors['main-orange']
  ];
  const chosenCategory = {
    border: screenWidth >= 1024 ? '7px solid #A9FB83' : '3px solid #A9FB83',
  };

  const onClickCategoriesHandler = (id) => {
    // check if de-choosing category by click again
    let chosenCategory = categoriesState.filter(
        e => e.id === id && e.selected === true);

    if (chosenCategory.length > 0) {
      unselectCategory(id);
    } else {
      if (selectedCategories.length >= 5) {
        toast.error('Maximum number of categories has been chosen', {
          position: "top-center",
          autoClose: 3000,
          theme: 'colored'
        });
      } else {
        selectCategory(id);
      }
    }
  };

  const unselectCategory = (id) => {
    setCategoriesState(
        categoriesState.map(item =>
            item.id === id
                ? {...item, selected: false}
                : item
        ));
    selectedCategories.splice(selectedCategories.indexOf(id));
    setSelectedCategories(selectedCategories);
  };

  const selectCategory = (id) => {
    setCategoriesState(
        categoriesState.map(item =>
            item.id === id
                ? {...item, selected: true}
                : item
        ));
    let array = selectedCategories;
    array.push(id);
    setSelectedCategories(array);
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        AxiosService.getCategories()
        .then(res => {
          setCategories(res.data.forEach(e => categories.push(e)));
          setLoading(false);
          setCategories(categories);
        })
        .catch(err => {
          AxiosService.errorToast(err);
        });
      }, 1000);
    }
  }, []);

  return (
      <>
        <Auth/>
        {loading ?

            <div className={'loading'}>
              <Loader/>
            </div> :

            <>
                <div className={'choose-category-page'}>
                  <div className={'choose-category-container grid-container'}>

                    <div className={'header-info grid-item'}>

                      <div className={'header-container'}>
                        <p className={'header'}>Choose 5 categories</p>
                      </div>

                      <div className={'user-info-container'}>
                        <UserInfo username={username}
                                  avatar={avatar}
                                  userScore={score}/>
                      </div>

                    </div>

                    <div className={'categories-container grid-item'}>
                      {categories.map(
                          ({id, category}, index) => (
                              <div className={'category-box'}>
                                <Category style={categoriesState[index].selected
                                    ? chosenCategory : {}}
                                          onClick={() => onClickCategoriesHandler(
                                              id)}
                                          category={category}/>
                              </div>
                          ))}
                    </div>

                    <div className={'button-container'}>
                      <Button text={'Choose'}
                              color={screenWidth >= 1024 ? colors['main-green']
                                  : colors['main-red']}
                              onClick={() => AxiosService.setCategories(
                                  duelId.duelId,
                                  selectedCategories, navigate)}/>
                    </div>

                  </div>
                </div>
            </>
        }
      </>
  );
};

export default ChooseCategory;
