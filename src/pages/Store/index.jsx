import { useState, useRef, useEffect } from "react";
import { useUserContext, api } from "../../utils";
import { Button, Heading, Modal, Pagination } from "../../common";
import Authorize from "./components/Authorize.net";

const Store = () => {
  const { loggedUser } = useUserContext();

  const [store, setStore] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const getStore = async () => {
      try {
        const {
          data: { result, totalPages },
        } = await api.get(`/allStore?page=${page}`);
        setStore(result);
        setTotalPages(totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    getStore();
  }, [page]);

  const dialogRef = useRef(null);
  const [openModal, setOpenModal] = useState({});

  return (
    <>
      <div>
        <Heading level={2} className="mb-4 sm:text-left text-center">Store</Heading>
        <p className="sm:text-left text-center">
          Exchange your money for credits. Credits can be used to purchase
          crates on our platform.
        </p>
        <section className="my-8">
          <div className="flex flex-wrap gap-8">
            {store.map((p, i) => (
              <div
                key={i}
                className="p-4 my-4 rounded-2xl bg-dark border border-primary w-96"
              >
                <h2 className="mt-2 mb-4 mx-2 text-center">{p.name}</h2>
                <div className="flex justify-center items-start mb-4">
                  <h4 className="mt-1">$</h4>
                  <h1 className="text-primary">{p.price}</h1>
                </div>
                <hr className="my-6 mx-6 border-dark2" />
                <h5 className="my-4 font-normal text-center">
                  You&apos;ll get {p.credits} web credits
                </h5>
                <Button
                  theme="primary"
                  size="md-rect"
                  className="w-full"
                  onClick={() => {
                    setOpenModal(p);
                    dialogRef.current.showModal();
                  }}
                >
                  Buy
                </Button>
              </div>
            ))}
          </div>
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </section>
      </div>
      <Modal
        ref={dialogRef}
        title="Pay with Card"
        content={<Authorize storeId={openModal._id} loggedUser={loggedUser} />}
        closeDialog={() => {
          setOpenModal({});
        }}
      />
    </>
  );
};

export default Store;
