import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from "react-bootstrap";
//import Select from 'react-select';
//import 'react-select/dist/react-select.css';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Card from "Admin/components/Card/Card.jsx";
import { updateFoodAction } from "Admin/actions/food";
import { foodCategoryListAction } from "Admin/actions/food_category";
import { servingSizeListAction } from "Admin/actions/serving_size";
import { languageListAction } from "Admin/actions/language";
//import { appConstants } from 'Admin/_constants/app.constants.js';

let Validator = require("validatorjs");
let formArr = {};
let rules = {
  //unitId: 'required',
  foodCategoryId: "required",
  qty: "required",
  veg: "required",
  carbohydrate: "required",
  protein: "required",
  fat: "required",
  calorie: "required",
  name_1: "required",
};
let mess = {
  required: "This field is required.",
  // calrequired:'Put total of carbohydrate, protein and fats calories in Calories field.'
};
let validation = [];
validation = new Validator({}, rules, mess);
validation.passes();
validation.fails();

class UpdateFood extends Component {
  constructor(props) {
    super(props);
    var foodCategory_id = "";
    var servingSize_id = this.props.location.state.row.unitId
      ? this.props.location.state.row.unitId
      : "";
    var servingSize_name = "";
    if (this.props.location.state.row.categoryData.length) {
      foodCategory_id = this.props.location.state.row.categoryData[0]._id;
    }

    if (this.props.location.state.row.servingSizeData.length) {
      servingSize_id = this.props.location.state.row.servingSizeData[0]._id;
      servingSize_name =
        this.props.location.state.row.servingSizeData[0].name["1"];
    }

    this.state = {
      foodCategoryList: [],
      servingSizeList: [],
      languageList: [],

      cardHidden: true,
      formArr: [],
      foodCategoryError: null,
      servingSizeError: null,
      qtyError: null,
      vegError: null,
      carbohydrateError: null,
      proteinError: null,
      fatError: null,
      calorieError: null,
      name_englishError: null,

      formData: {
        id: this.props.location.state.row._id,
        foodCategoryId: foodCategory_id,
        qty: this.props.location.state.row.qty,
        unitId: servingSize_id,
        calorie: this.props.location.state.row.calorie,
        carbohydrate: this.props.location.state.row.carbohydrate,
        protein: this.props.location.state.row.protein,
        fat: this.props.location.state.row.fat,
        veg: this.props.location.state.row.veg,
        carbohydrate_cal: this.props.location.state.row.carbohydrate * 4,
        protein_cal: this.props.location.state.row.protein * 4,
        fat_cal: this.props.location.state.row.fat * 9,
        name_1: this.props.location.state.row.name["1"],
        name: this.props.location.state.row.name,
        info: this.props.location.state.row.info,
        info_1: this.props.location.state.row.info
          ? this.props.location.state.row.info["1"]
          : "",
        description: this.props.location.state.row.description,
        description_1: this.props.location.state.row.description
          ? this.props.location.state.row.description["1"]
          : "",
        serving_size: servingSize_name,
      },
      isLogin: true,
      showProcessing: false,
      limitForm: {},
    };
  }

  componentDidMount() {
    let data = this.state.limitForm;
    data["limitStatus"] = true;
    this.props.foodCategoryListAction(data);
    this.props.servingSizeListAction(data);
    this.props.languageListAction(data);
    this.handleChangeFoodDetail();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFoodCategoryList !== this.props.isFoodCategoryList) {
      this.setState({ foodCategoryList: nextProps.FoodCategoryList.data.data });
    }

    if (nextProps.isServingSizeList !== this.props.isServingSizeList) {
      this.setState({ servingSizeList: nextProps.ServingSizeList.data.data });
    }

    if (nextProps.isLanguageList !== this.props.isLanguageList) {
      this.setState({ languageList: nextProps.LanguageList.data });
    }

    if (nextProps.isUpdateFoodError !== this.props.isUpdateFoodError) {
      if (nextProps.msg.errors) {
        nextProps.msg.errors.map((key, i) => {
          this.setState({
            [key.param + "Error"]: (
              <small className="text-danger">{key.msg}</small>
            ),
          });
        });
      }
    }

    if (nextProps.isUpdateFood !== this.props.isUpdateFood) {
      this.props.handleClick("success", nextProps.UpdateFood.msg);
      this.props.history.push("/admin/food-list");
    }
  }

  handleChange(e) {
    e.preventDefault();
    let field = this.state.formData;
    field[e.target.name] = e.target.value;

    if (e.target.name == "carbohydrate") {
      field["carbohydrate_cal"] = e.target.value * 4.0;
    }
    if (e.target.name == "protein") {
      field["protein_cal"] = e.target.value * 4.0;
    }
    if (e.target.name == "fat") {
      field["fat_cal"] = e.target.value * 9.0;
    }
    let total_cal = field.carbohydrate_cal + field.protein_cal + field.fat_cal;
    let calorie_diff = (total_cal * 15) / 100;
    let calorie = field.calorie;

    if (calorie > 100 && calorie <= 300) {
      calorie_diff = (total_cal * 10) / 100;
    } else if (calorie > 300) {
      calorie_diff = (total_cal * 5) / 100;
    }
    let min_cal = total_cal - calorie_diff;
    let max_cal = total_cal + calorie_diff;

    if (calorie >= min_cal && calorie <= max_cal) {
      field.calorieError = null;
      this.setState({ calorieError: null });
    } else {
      field.calorieError =
        "Put total of carbohydrate, protein and fats calories in Calories field.";
      this.setState({
        calorieError:
          "Put total of carbohydrate, protein and fats calories in Calories field.",
      });
      //field.calorie = "";
    }

    this.setState({ formData: field });
  }

  handleChangeFood(e) {
    e.preventDefault();
    let index = e.target.selectedIndex;
    let field = this.state.formData;
    field[e.target.name] = e.target.value;
    if (e.target.name == "unitId") {
      field["serving_size"] = e.target.value != "" ? e.target[index].text : "";
    }

    this.setState({ formData: field });
    this.handleChangeFoodDetail();
  }

  handleChangeName(e, language) {
    e.preventDefault();
    let field = this.state.formData;
    field.name[language] = e.target.value;
    field[e.target.name] = e.target.value;
    this.setState({ formData: field });
    this.handleChangeFoodDetail();
  }

  handleChangeInfo(e, language) {
    e.preventDefault();
    let field = this.state.formData;
    field.info[language] = e.target.value;
    field[e.target.name] = e.target.value;
    this.setState({ formData: field });
    this.handleChangeFoodDetail();
  }

  handleChangeDesc(e, language) {
    e.preventDefault();
    let field = this.state.formData;
    field.description[language] = e.target.value;
    field[e.target.name] = e.target.value;
    this.setState({ formData: field });
    this.handleChangeFoodDetail();
  }

  handleChangeFoodDetail() {
    let foodDetail = "";
    let foodDetailCalorie = "";
    if (this.state.formData.name_1) {
      foodDetail = this.state.formData.name_1;
    }
    // this.state.formData.qty} {this.state.formData.serving_size
    if (this.state.formData.qty) {
      foodDetail = foodDetail + "," + this.state.formData.qty;
    }

    if (this.state.formData.serving_size) {
      foodDetail = foodDetail + " " + this.state.formData.serving_size;
    }

    // if (this.state.formData.info["1"]) {
    //   foodDetail = foodDetail + "(" + this.state.formData.info["1"];
    //   if (this.state.formData.description["1"]) {
    //     foodDetail =
    //       foodDetail + "," + this.state.formData.description["1"] + ")";
    //   } else {
    //     foodDetail = foodDetail + ")";
    //   }
    // }

    if (this.state.formData.calorie) {
      foodDetailCalorie = "Calorie" + this.state.formData.calorie + " kcal";
    }
    this.setState({ foodDetail: foodDetail });
    this.setState({ foodDetailCalorie: foodDetailCalorie });
  }

  allValidate(check) {
    if (!check) {
      formArr = [];
      Object.keys(rules).forEach(function (key) {
        formArr[key] = "TT";
      });
      this.setState({
        formArr,
      });
    }
    if (validation.passes()) {
      return 1;
    }
  }

  updateFood(evt) {
    evt.preventDefault();
    const _this = this;

    if (this.allValidate(false)) {
      let field = this.state.formData;
      _this.setState({ showProcessing: true });
      _this.props.updateFoodAction(field);
    }
    //validation.errors()
  }

  goBackFun(e) {
    this.props.history.replace(sessionStorage.getItem("prvUrl"));
  }

  render() {
    validation = new Validator(this.state.formData, rules, mess);
    validation.passes();
    validation.fails();
    let _this = this;
    return (
      <div className="main-content" style={{ padding: "15px 0px" }}>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={
                  <legend className="line-removes">
                    <Button
                      className="go-back-btn-1"
                      bsStyle="info"
                      onClick={(e) => {
                        this.goBackFun(e);
                      }}
                    >
                      Back
                    </Button>
                  </legend>
                }
                content={
                  <Form horizontal>
                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Food category <span className="star">*</span>
                      </Col>
                      <Col sm={6}>
                        <select
                          className="form-control"
                          name="foodCategoryId"
                          value={this.state.formData.foodCategoryId}
                          onChange={(event) => this.handleChangeFood(event)}
                        >
                          <option value="">Select Food Category</option>
                          {this.state.foodCategoryList.map(function (item) {
                            return (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>

                        <span className="errorMsg">
                          {this.state.foodCategoryError}
                          {this.state.formArr.foodCategoryId &&
                            validation.errors.first("foodCategoryId")}
                        </span>
                      </Col>
                    </FormGroup>

                    {/*  <div className="right-food">{this.state.formData.name_1+","}{this.state.formData.qty} {this.state.formData.serving_size}({this.state.formData.info_1}{","+this.state.formData.description_1}) <br></br> Calorie {this.state.formData.calorie} kcal</div> */}

                    <div className="right-food">
                      {this.state.foodDetail} <br></br>{" "}
                      {this.state.foodDetailCalorie}
                    </div>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Name <span className="star">*</span>
                      </Col>
                      <Col sm={6} className="spcc">
                        {this.state.languageList.map(function (lang) {
                          return (
                            <>
                              <label>{lang.name}</label>{" "}
                              <FormControl
                                className="spc-in"
                                type="text"
                                name={"name_" + lang.lanId}
                                id={"name_" + lang.lanId}
                                placeholder={lang.name}
                                value={_this.state.formData.name[lang.lanId]}
                                onChange={(event) => {
                                  _this.handleChangeName(event, lang.lanId);
                                }}
                              />{" "}
                            </>
                          );
                        })}

                        <span className="errorMsg">
                          {this.state.name_englishError}
                          {this.state.formArr.name_1 &&
                            validation.errors.first("name_1")}
                        </span>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Information to print
                      </Col>
                      <Col sm={6} className="spcc">
                        {this.state.languageList.map(function (lang) {
                          return (
                            <>
                              <label>{lang.name}</label>{" "}
                              <FormControl
                                className="spc-in"
                                type="text"
                                name={"info_" + lang.lanId}
                                id={"info_" + lang.lanId}
                                placeholder={lang.name}
                                value={
                                  _this.state.formData.info === undefined
                                    ? ""
                                    : _this.state.formData.info[lang.lanId]
                                }
                                onChange={(event) => {
                                  _this.handleChangeInfo(event, lang.lanId);
                                }}
                              />{" "}
                            </>
                          );
                        })}
                      </Col>
                    </FormGroup>
                    <div className="right-food">
                      {this.state.foodDetail} <br></br>{" "}
                      {this.state.foodDetailCalorie}
                    </div>
                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Serving <span className="star">*</span>
                      </Col>

                      <Col sm={3}>
                        <FormControl
                          type="number"
                          name="qty"
                          id="qty"
                          value={this.state.formData.qty}
                          placeholder="qty"
                          onChange={(e) => {
                            this.handleChangeFood(e);
                          }}
                        />
                        <span className="errorMsg">
                          {this.state.qtyError}
                          {this.state.formArr.qty &&
                            validation.errors.first("qty")}
                        </span>
                      </Col>

                      <Col sm={3}>
                        <select
                          className="form-control"
                          name="unitId"
                          value={this.state.formData.unitId}
                          onChange={(event) => this.handleChangeFood(event)}
                        >
                          <option value="">Select Serving Size</option>
                          {this.state.servingSizeList.map(function (item) {
                            return (
                              <option key={item._id} value={item._id}>
                                {item.name["1"]}
                              </option>
                            );
                          })}
                        </select>
                        <span className="errorMsg">
                          {this.state.servingSizeError}
                          {this.state.formArr.unitId &&
                            validation.errors.first("unitId")}
                        </span>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Additional comments
                      </Col>
                      <Col sm={6} className="spcc">
                        {this.state.languageList.map(function (lang) {
                          return (
                            <>
                              <label>{lang.name}</label>{" "}
                              <FormControl
                                className="spc-in"
                                type="text"
                                name={"description_" + lang.lanId}
                                id={"description_" + lang.lanId}
                                placeholder={lang.name}
                                value={
                                  _this.state.formData.description === undefined
                                    ? ""
                                    : _this.state.formData.description[
                                        lang.lanId
                                      ]
                                }
                                onChange={(event) => {
                                  _this.handleChangeDesc(event, lang.lanId);
                                }}
                              />{" "}
                            </>
                          );
                        })}
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Carbohydrate (g) <span className="star">*</span>
                      </Col>
                      <Col sm={6}>
                        <FormControl
                          type="text"
                          name="carbohydrate"
                          placeholder="carbohydrate"
                          id="carbohydrate"
                          value={this.state.formData.carbohydrate}
                          onChange={(e) => {
                            this.handleChange(e);
                          }}
                        />
                        <span className="errorMsg">
                          {this.state.carbohydrateError}
                          {this.state.formArr.carbohydrate &&
                            validation.errors.first("carbohydrate")}
                        </span>
                      </Col>
                      ( {this.state.formData.carbohydrate_cal} kcal)
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Protein (g) <span className="star">*</span>
                      </Col>
                      <Col sm={6}>
                        <FormControl
                          type="text"
                          name="protein"
                          id="protein"
                          placeholder="protein"
                          value={this.state.formData.protein}
                          onChange={(e) => {
                            this.handleChange(e);
                          }}
                        />
                        <span className="errorMsg">
                          {this.state.proteinError}
                          {this.state.formArr.protein &&
                            validation.errors.first("protein")}
                        </span>
                      </Col>
                      ( {this.state.formData.protein_cal} kcal)
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Fat (g) <span className="star">*</span>
                      </Col>
                      <Col sm={6}>
                        <FormControl
                          type="text"
                          name="fat"
                          id="fat"
                          placeholder="fat"
                          value={this.state.formData.fat}
                          onChange={(e) => {
                            this.handleChange(e);
                          }}
                        />
                        <span className="errorMsg">
                          {this.state.fatError}
                          {this.state.formArr.fat &&
                            validation.errors.first("fat")}
                        </span>
                      </Col>
                      ( {this.state.formData.fat_cal} kcal)
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Calorie (kcals) <span className="star">*</span>
                      </Col>
                      <Col sm={6}>
                        <FormControl
                          type="text"
                          name="calorie"
                          id="calorie"
                          placeholder="calorie"
                          value={this.state.formData.calorie}
                          onChange={(e) => {
                            this.handleChange(e);
                          }}
                        />
                        <span className="errorMsg">
                          {this.state.calorieError}
                          {this.state.formArr.calorie &&
                            validation.errors.first("calorie")}
                        </span>
                        {/* <span className="errorMsg">
                                                    {this.state.formData.calorie_error}</span> */}
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Food type <span className="star">*</span>
                      </Col>
                      <Col sm={6}>
                        <select
                          className="form-control"
                          name="veg"
                          placeholder="Vegetarian"
                          value={this.state.formData.veg}
                          onChange={(event) => this.handleChangeFood(event)}
                        >
                          <option value="veg-s">Vegetarian</option>
                          <option value="non-veg-s">Non Vegetarian</option>
                        </select>

                        <span className="errorMsg">
                          {this.state.vegError}
                          {this.state.formArr.veg &&
                            validation.errors.first("veg")}
                        </span>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}></Col>
                      <Col sm={6}>
                        <button
                          type="button"
                          onClick={this.updateFood.bind(this)}
                          className="btn-fill btn-wd btn btn-info"
                        >
                          Save
                        </button>
                        &nbsp;
                      </Col>
                    </FormGroup>
                  </Form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    msg: state.food.message,

    UpdateFood: state.food.UpdateFood,
    isUpdateFood: state.food.isUpdateFood,
    isUpdateFoodError: state.food.isUpdateFoodError,

    FoodCategoryList: state.foodCategory.FoodCategoryList,
    isFoodCategoryList: state.foodCategory.isFoodCategoryList,
    isFoodCategoryListError: state.foodCategory.isFoodCategoryListError,

    ServingSizeList: state.servingSize.ServingSizeList,
    isServingSizeList: state.servingSize.isServingSizeList,
    isServingSizeListError: state.servingSize.isServingSizeListError,

    LanguageList: state.language.LanguageList,
    isLanguageList: state.language.isLanguageList,
    isLanguageListError: state.language.isLanguageListError,
  };
}
export default withRouter(
  connect(mapStateToProps, {
    updateFoodAction,
    foodCategoryListAction,
    languageListAction,
    servingSizeListAction,
  })(UpdateFood)
);
