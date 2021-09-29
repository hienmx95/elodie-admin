/* begin general import */
import img1 from "assets/images/purchase-type/1.png";
import img2 from "assets/images/purchase-type/2.png";
import img3 from "assets/images/purchase-type/3.png";
import img4 from "assets/images/purchase-type/4.png";
import AppFooter from "components/AppFooter/AppFooter";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { queryStringService } from "services/query-string-service";
import "./PurchasePlanSelectType.scss";

interface CardProps {
  translate: (arg0: string) => string;
  index: number;
  image: string;
  classNames?: string;
  select: () => void;
}

interface PurchasePlanSelectTypeProps {
  setViewIndex?: Dispatch<SetStateAction<string>>;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

function TypeCard(props: CardProps) {
  const { translate, index, image, classNames, select } = props;
  return (
    <div
      className={`d-flex align-items-center justify-content-center type-card bg-white w-100 ${classNames}`}
      onClick={select}
    >
      <div className="mr-5">
        <div className="type-card__title">
          {translate(`purchasePlans.create.type${index}`)}
        </div>
        <div className="type-card__des">
          {translate(`purchasePlans.create.desc${index}`)}
        </div>
      </div>
      <div>
        <img src={image} alt="" />
      </div>
    </div>
  );
}

function PurchasePlanSelectType(props: PurchasePlanSelectTypeProps) {
  const [translate] = useTranslation();
  const history = useHistory();
  const { setViewIndex, setLoading } = props;
  const { id: purchaseRequestId } = queryStringService.useGetQueryString(
    "purchaseRequestId"
  );
  const handleGoBack = useCallback(() => {
    if (
      typeof purchaseRequestId !== "undefined" &&
      purchaseRequestId !== null
    ) {
      setViewIndex("1");
      setLoading(true);
    } else {
      setViewIndex("2");
      setLoading(true);
    }
  }, [purchaseRequestId, setLoading, setViewIndex]);

  const handleGoCreate = useCallback(
    (type: string) => {
      let urlQuery = `?purchasePlanTypeId=${type}`;
      if (
        typeof purchaseRequestId !== "undefined" &&
        purchaseRequestId !== null
      ) {
        urlQuery = `${urlQuery}&purchaseRequestId=${purchaseRequestId}`;
      }
      history.push({
        pathname: "/ppf/purchase-plan/purchase-plan-detail/",
        search: urlQuery,
      });
    },
    [history, purchaseRequestId]
  );

  const childrenAction = React.useMemo(() => {
    return (
      <>
        <button
          className="btn btn-danger component__btn-toggle grow-animate-1 btn-customize mr-4"
          onClick={handleGoBack}
        >
          <span>
            <i className="tio-clear_circle_outlined"></i>{" "}
            {translate("general.button.cancel")}
          </span>
        </button>
      </>
    );
  }, [handleGoBack, translate]);

  return (
    <>
      <div className=" page__navigation">
        <div className="d-flex">
          <TypeCard
            index={1}
            image={img1}
            classNames="mr-3"
            translate={translate}
            select={() => handleGoCreate("1")}
          />
          <TypeCard
            index={2}
            image={img2}
            translate={translate}
            select={() => handleGoCreate("2")}
          />
        </div>
        <div className="d-flex mt-3">
          <TypeCard
            classNames="mr-3"
            index={3}
            image={img3}
            translate={translate}
            select={() => handleGoCreate("4")}
          />
          <TypeCard
            index={4}
            image={img4}
            translate={translate}
            select={() => handleGoCreate("3")}
          />
        </div>
      </div>
      <AppFooter childrenAction={childrenAction}></AppFooter>
    </>
  );
}

export default PurchasePlanSelectType;
