import React, {useCallback} from "react";
import * as PropTypes from "prop-types";
import {ScrollView} from "react-native";
import get from "lodash/get";
import SelectFilter from "../../Search/SelectFilter";
import {idProp} from "../../../lib/utils";
import ProfessionsFilter from "./ProfessionsFilter";
import {FILTER_BY_HOUSE, FILTER_BY_INTERESTS, FILTER_BY_PROFESSIONS} from "../helpers";
import InterestsFilter from "./InterestsFilter";

function SearchFilters(props) {
  const {
    filters, housesList, currentHouse, openFilterTypeModal,
    currentProfList, setCurrentProfList, currentInterestsList, setCurrentInterestsList,
  } = props;

  const handleOpenOptionsModal = useCallback(() => {
    openFilterTypeModal(FILTER_BY_HOUSE);
  }, [openFilterTypeModal]);

  const openProfessionsModal = useCallback(() => {
    openFilterTypeModal(FILTER_BY_PROFESSIONS);
  }, [openFilterTypeModal]);

  const openInterestsModal = useCallback(() => {
    openFilterTypeModal(FILTER_BY_INTERESTS);
  }, [openFilterTypeModal]);

  return (
    <ScrollView>
      <SelectFilter
        label={get(filters, "filterTypes.houses.label")}
        defaultValue={get(filters, "filterTypes.houses.label")}
        currentValue={currentHouse?.label || get(filters, "filterTypes.houses.label")}
        handleOpenOptionsModal={handleOpenOptionsModal}
        disabled={!housesList} />
      <ProfessionsFilter
        value={currentProfList}
        onChange={setCurrentProfList}
        openModal={openProfessionsModal}
        label={get(filters, "filterTypes.professions.label")}
        placeholder={get(filters, "filterTypes.professions.placeholder")} />
      <InterestsFilter
        value={currentInterestsList}
        onChange={setCurrentInterestsList}
        openModal={openInterestsModal}
        label={get(filters, "filterTypes.interests.label")}
        placeholder={get(filters, "filterTypes.interests.placeholder")} />
    </ScrollView>
  );
}

SearchFilters.propTypes = {
  filters: PropTypes.shape({}),
  housesList: PropTypes.arrayOf(PropTypes.shape({
    id: idProp,
    label: PropTypes.string,
  })),
  currentHouse: PropTypes.shape({
    id: idProp,
    label: PropTypes.string,
  }),
  openFilterTypeModal: PropTypes.func,
  currentProfList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  setCurrentProfList: PropTypes.func,
  currentInterestsList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  setCurrentInterestsList: PropTypes.func,
};

export default React.memo(SearchFilters);
