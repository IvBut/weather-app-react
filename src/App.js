import React from 'react';
import './App.css';
import {Button, NavDropdown, Navbar, Nav, Form, FormControl, Spinner} from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import SearchComponent from "./components/searchComponent/SearchComponent";
import data from './assets/city.list.min';
import {APP_SETTINGS, AVAILABLE_LANGUAGES} from "./constants/ApplicationConfig";
import {openWeatherService} from "./services/OpenWeatherService";
import {changeLanguage} from "./store/actions/languageActionCreator";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";



function App({onLanguageChange, isActive}) {

    const {t} = useTranslation('translation');
    const spinner =  <div className="app-spinner-wrapper"><Spinner className="app-spinner" animation="border"  variant="primary" /></div>

    const handleWeatherSearch = (city) => {
        openWeatherService.getWeather(city)
            .then((resp)=>{
                console.log(resp)
            })
    };

    const handleChangeLanguage = (lang) => {
        onLanguageChange(AVAILABLE_LANGUAGES[lang]);
    };

    return (
    <>
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand>
                <img src={APP_SETTINGS.APP_LOGO_SRC}
                     width="60"
                     height="60"
                     alt="logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <DropdownButton id="dropdown-basic-button" title={t('language-btn.name')}>
                        {
                            Object.keys(AVAILABLE_LANGUAGES).map((lang,idx) =>{
                                return (
                                    <Dropdown.Item key={`${lang}-${idx}`} onClick={() => handleChangeLanguage(lang)}>{t(`language-btn.options.${lang}`)}</Dropdown.Item>
                                )
                            })
                        }
                    </DropdownButton>
                </Nav>
                <div>
                    <SearchComponent searchField='name' dataArray={data} onSearch={handleWeatherSearch}/>
                </div>
            </Navbar.Collapse>
        </Navbar>
        <section>
            {new Array(9).fill(0).map(item => (<div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab autem consequuntur distinctio ea error est exercitationem explicabo fugiat, harum illo ipsam magnam magni modi nobis, pariatur perspiciatis quo reiciendis tempore totam, ut. Aliquid animi assumenda blanditiis consequatur deserunt, ea exercitationem explicabo ipsa ipsam itaque iusto molestias nemo officia porro praesentium provident quaerat recusandae saepe sapiente similique tempora unde, voluptatem voluptatibus. Ad amet debitis distinctio iure maiores odio quae ratione rem repellendus similique? Animi atque autem consectetur corporis dicta dolor dolorem dolorum ducimus eligendi error excepturi, exercitationem facilis fuga illum ipsam labore molestiae necessitatibus nemo officiis omnis perferendis quae quaerat, recusandae reiciendis repellat sint sunt tempore totam vel voluptatum. Blanditiis consectetur consequuntur dolores eaque eius facere fugit incidunt ipsam, iusto maxime minus numquam omnis, porro possimus qui quo repudiandae rerum temporibus. Asperiores aut consectetur dolor doloremque doloribus earum eum exercitationem facere hic illum inventore ipsa labore laboriosam magnam, molestiae, nam nobis qui quia recusandae reiciendis similique sit, tempore voluptatum! Accusantium, adipisci asperiores dignissimos dolorem dolorum hic incidunt, nam, nulla odio quae quibusdam quis sint soluta! Cupiditate dignissimos distinctio dolorum ducimus eum eveniet laboriosam sapiente sequi! Accusamus aliquam aperiam dolor dolores eius, error ex ipsa libero natus nulla obcaecati quas, sequi. Corporis earum enim illo molestias, quasi quo ut vel? Ab aliquid autem dolore harum maxime, nam praesentium quaerat saepe sed sint! Enim, nostrum, saepe. Asperiores deserunt porro quae! Aperiam dolorem hic libero molestiae nostrum quibusdam ratione veritatis. Atque consequuntur corporis cum deleniti dicta, dolorem, doloribus dolorum ducimus facere harum hic nesciunt nobis non perspiciatis praesentium provident quam quibusdam ratione repellat repellendus reprehenderit sequi ut vel vero vitae, voluptatem voluptatum. Debitis doloremque ea earum eligendi eos id molestiae necessitatibus nihil numquam repellendus! A adipisci asperiores at dicta dolores ex, expedita illo in labore laudantium magni praesentium qui, quod recusandae ut. Dolore facere itaque molestiae quia sint! Amet dicta dolorum iste obcaecati odio odit qui quos sunt! Aliquid autem, dolore doloremque, dolorum eaque eum eveniet, fugiat impedit laborum libero magni molestiae nihil nulla repellat repudiandae ullam voluptatibus? Est excepturi nobis quae! Ab adipisci assumenda error quis? A aliquid assumenda blanditiis commodi corporis culpa dicta dolore dolorum ea eveniet excepturi fugit harum inventore ipsa ipsam iste iure iusto laboriosam laborum magnam nam nostrum perferendis praesentium quae quasi quia quo reiciendis rem repellat sit, soluta tempora vel veritatis. Dolorem nemo nulla recusandae repellat totam. Ad, architecto, eaque! Aspernatur beatae consequuntur cupiditate deserunt dolorem eligendi, error, est eum excepturi hic in ipsa necessitatibus nemo nobis numquam porro possimus quibusdam, quod quos reiciendis repellendus reprehenderit voluptas voluptate! Deserunt eius explicabo ipsum nesciunt non nostrum quas quasi recusandae suscipit tempore! Ab, adipisci consectetur debitis deleniti deserunt explicabo fugiat incidunt itaque libero rem, voluptate voluptates? Ab aspernatur culpa cumque eius eveniet inventore laborum necessitatibus, quia quibusdam sunt tenetur vel vitae voluptates. Accusamus ad alias autem beatae corporis cumque dolorum error et expedita fugit illum ipsum iure iusto laudantium magni modi nam natus non, odit perspiciatis quae quas quibusdam reiciendis sapiente sequi sint unde velit? Beatae dignissimos reprehenderit suscipit tempora vel. Dignissimos eaque natus sit? Esse fuga natus odit. Aliquam consequuntur deleniti distinctio dolores est eveniet, facilis fugiat hic, iste itaque magni nihil non odit porro possimus quos rerum sapiente tenetur veniam voluptas! Accusamus alias atque corporis dolorum, harum libero non quam quos sint sunt! Adipisci animi aut ea, earum fuga harum ipsum itaque laboriosam nostrum officia officiis perspiciatis placeat porro possimus provident, ratione sint ullam? Aliquam at autem cum dicta dolor doloremque esse fuga illo impedit iure laudantium maiores mollitia, nihil perferendis perspiciatis qui quod sint sunt velit voluptatum. Alias, blanditiis consequuntur cum ea facere illum magni nobis non perferendis quae quaerat rem repellat sapiente tempore, totam ullam voluptatum. Aspernatur earum facere ipsum labore nulla veniam, vero. Adipisci architecto aspernatur assumenda, aut autem beatae blanditiis debitis deleniti doloribus ea enim error eveniet explicabo fuga hic impedit in incidunt ipsam iure labore libero magni maxime molestiae mollitia nesciunt nobis non nostrum odit optio pariatur praesentium quas quidem repellat rerum sint tempore ut! Ea fugiat ipsam laboriosam sit, tempora tenetur vitae voluptatem. Accusantium aliquam commodi consequuntur dignissimos doloribus, esse illo incidunt inventore ipsum iste laudantium nemo nulla possimus, praesentium quam quia quidem quisquam quod repellat sint, sit totam voluptatem voluptates? Accusamus animi aperiam autem dolor enim facere iste necessitatibus sint voluptatibus voluptatum! Aperiam consectetur dicta recusandae soluta temporibus voluptate? Atque consectetur debitis, eius illum minus soluta tenetur? Blanditiis delectus, et labore ratione reprehenderit rerum voluptatum? Aspernatur at consectetur deleniti dolores excepturi expedita fuga id, ipsam labore magni minus, mollitia perferendis possimus quos reprehenderit vitae voluptatum! Excepturi incidunt quibusdam sequi similique voluptates. Asperiores beatae error facere facilis fugit harum laudantium, molestias, mollitia placeat quibusdam reiciendis repellendus velit. Alias aliquam commodi consectetur consequuntur cupiditate dignissimos error esse exercitationem inventore minus nisi nulla obcaecati saepe sunt, unde vel velit voluptates! Alias aliquam amet assumenda at blanditiis culpa dicta dolorem doloremque earum eos et explicabo illum inventore iure magni maxime, nesciunt numquam obcaecati odio perspiciatis provident quae quaerat quidem reprehenderit saepe sunt ullam voluptate! A architecto consequatur esse rerum. Animi, aperiam at deleniti eaque enim fugit illum iure maxime nam nulla pariatur porro quia sint sit sunt. A ab accusamus aperiam aut autem blanditiis commodi corporis doloribus dolorum eveniet inventore iusto magni necessitatibus nobis nostrum numquam omnis perspiciatis quasi qui reiciendis rem repellendus sed suscipit, tempore temporibus ut vel velit veniam veritatis vitae! Autem dicta dolorum molestiae quidem quis quod quos saepe tenetur voluptate? Assumenda autem et eveniet quos repudiandae veritatis, voluptas. A, earum eum. Ab adipisci aspernatur, at atque commodi consequatur consequuntur cumque deleniti dicta dolor dolores eligendi eos explicabo fugiat ipsum iste, laborum molestiae nemo nisi numquam odio perferendis quas quia quod, recusandae repudiandae sapiente similique soluta tempore unde vel veniam veritatis voluptatum? Ad adipisci aliquid aperiam assumenda beatae debitis delectus deleniti dignissimos distinctio dolorem dolorum esse in ipsa ipsam natus nulla obcaecati pariatur provident quidem quis quod, recusandae saepe similique sit, ullam vitae voluptatibus. Ex excepturi harum iusto necessitatibus, nobis pariatur provident quaerat quibusdam quod similique? A excepturi hic neque rem totam?
            </div>))}
        </section>
        {
            isActive && spinner
        }
    </>
  );
}

function mapStateToProps(state) {
    return {
        isActive: state.appStatusReducer.isPending
    }
}

function mapDispatchToProps(dispatch){
    return {
        onLanguageChange: (languageName) => dispatch(changeLanguage(languageName))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
