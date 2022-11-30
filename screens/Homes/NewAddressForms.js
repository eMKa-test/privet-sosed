import React from "react";
import * as PropTypes from "prop-types";
import {Alert, View} from "react-native";
import get from "lodash/get";
import styles from "./styles";
import getUserGeo from "../../lib/api/house/geo";
import AsyncSelect from "../../components/inputs/AsyncSelect";
import DefaultButton from "../../components/buttons/default";
import Loader from "../../components/loader";
import listCities from "../../lib/api/house/list-cities";
import listStreets from "../../lib/api/house/list-streets";
import listHouses from "../../lib/api/house/list-houses";
import TransparentButton from "../../components/buttons/transparent";
import TextArea from "../../components/inputs/TextArea";
import createRequest from "../../lib/api/house/create-request";
import createHouse from "../../lib/api/house/create-house";

const initialState = () => ({
  cityId: "",
  cityName: "",
  streetId: "",
  streetName: "",
  houseId: "",
  houseName: "",
});

const CITY = "CITY";
const STREET = "STREET";
const HOUSE = "HOUSE";
const NEW_ADDR = "NEW_ADDR";

const reducer = (state, action) => {
  switch (action.type) {
    case CITY:
      return {
        ...initialState(),
        cityId: action.cityId,
        cityName: action.cityName,
      };
    case STREET:
      return {
        ...state,
        streetId: action.streetId,
        streetName: action.streetName,
        houseId: "",
        houseName: "",
      };
    case HOUSE:
      return {
        ...state,
        houseId: action.houseId,
        houseName: action.houseName,
      };
    case NEW_ADDR: {
      return {
        ...state,
        newAddr: action.newAddr,
      };
    }
    default:
      return state;
  }
};

function NewAddressForms(props) {
  const {afterSubmit} = props;
  const [newAddr, setNewAddr] = React.useState(false);
  const [started, setStarted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(null);
  const [location, dispatchLocation] = React.useReducer(reducer, initialState());

  React.useEffect(() => {
    (async () => {
      const loc = await getUserGeo();
      dispatchLocation({
        type: CITY,
        cityId: get(loc, "city_id", ""),
        cityName: get(loc, "city", ""),
      });
      setStarted(true);
    })();
  }, []);

  if (!started) {
    // если первый маунт, показываем лоадер
    // после ответа от сервера по пользовательской позиции,
    // там будет или хеш ответа, или андефайнд
    return (
      <View style={styles.loader}>
        <Loader active />
      </View>
    );
  }

  const submit = async () => {
    let messages = [], data = {}, error;
    try {
      if (newAddr) {
        const text = get(location, "newAddr");
        if (!text) {
          return setErrors({newAddr: true});
        }
        setLoading(true);
        ({error, data, messages} = await createRequest(text));
      } else {
        const {houseId, streetId} = location;
        if (!houseId || !streetId) {
          const err = {
            houseId: !houseId,
            streetId: !streetId,
          };
          return setErrors(err);
        }
        setLoading(true);
        ({error, data, messages} = await createHouse(houseId));
      }
    } finally {
      setLoading(false);
    }
    if (error !== -1) {
      afterSubmit(newAddr, data);
    } else {
      const {msg} = Array.isArray(messages) ? messages[0] : {};
      Alert.alert("", msg?.toString());
    }
  };

  return (
    <View style={styles.newAddrForms}>
      {newAddr ? (
        <TextArea
          onError={errors?.newAddr}
          initialValue={get(location, "newAddr", "")}
          label="Адрес"
          onInputChange={(v) => {
            setErrors(null);
            dispatchLocation({type: NEW_ADDR, newAddr: v});
          }} />
      ) : (
        <React.Fragment>
          <AsyncSelect
            disabled={false}
            request={async (str, callback) => {
              const res = await listCities({q: str});
              if (Array.isArray(res)) {
                callback(res.map((item) => ({
                  id: item.id,
                  firstLine: `${get(item, "socr")} ${get(item, "name")}`,
                  secondLine: get(item, "dbregion.name"),
                })));
              }
            }}
            afterSelect={({id, firstLine}) => {
              dispatchLocation({
                type: CITY,
                cityId: id,
                cityName: firstLine,
              });
            }}
            value={get(location, "cityName", "")}
            label="Город / Населенный пункт"
            placeholder="Выберите город"
            infoText="Введите название Города или Населенного пункта" />
          <AsyncSelect
            onError={errors?.streetId}
            disabled={!location.cityId}
            request={async (str, callback) => {
              const res = await listStreets({id: location.cityId, q: str});
              if (Array.isArray(res)) {
                callback(res.map((item) => ({
                  id: item.id,
                  firstLine: `${get(item, "socr")} ${get(item, "name")}`,
                })));
              }
            }}
            afterSelect={({id, firstLine}) => {
              setErrors(null);
              dispatchLocation({
                type: STREET,
                streetId: id,
                streetName: firstLine,
              });
            }}
            value={get(location, "streetName", "")}
            label="Улица"
            placeholder="Выберите улицу"
            infoText="Введите название Улицы" />
          <AsyncSelect
            onError={errors?.houseId}
            disabled={!location.streetId}
            value={get(location, "houseName", "")}
            request={async (str, callback) => {
              const res = await listHouses({id: location.streetId, q: str});
              if (Array.isArray(res)) {
                callback(res.map((item) => ({
                  id: item.id,
                  firstLine: get(item, "name"),
                })));
              }
            }}
            afterSelect={({id, firstLine}) => {
              setErrors(null);
              dispatchLocation({
                type: HOUSE,
                houseId: id,
                houseName: firstLine,
              });
            }}
            label="Дом"
            placeholder="Выберите номер дома"
            infoText="Выберите номер дома" />
        </React.Fragment>
      )}
      <View
        style={{
          marginTop: 16,
          marginBottom: 20,
        }}>
        <DefaultButton
          disabled={loading}
          loading={loading}
          title="Добавить"
          onPress={submit} />
      </View>
      {newAddr ? (
        <TransparentButton
          underline
          title="Вернуться к выбору адреса"
          onPress={() => {
            setNewAddr(false);
            dispatchLocation({
              type: NEW_ADDR,
              newAddr: undefined,
            });
          }} />
      ) : (
        <TransparentButton
          underline
          title="Не нашли свой дом?"
          onPress={() => setNewAddr(true)} />
      )}
    </View>
  );
}

NewAddressForms.propTypes = {
  afterSubmit: PropTypes.func,
};

export default React.memo(NewAddressForms);
