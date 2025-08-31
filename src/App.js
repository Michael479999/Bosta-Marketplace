import React, { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Row, Col, Nav, Form, Button, Card, Badge, InputGroup, Modal, Table, Offcanvas } from "react-bootstrap";

/* =======================
   Global styles – Bosta-like clean dashboard look
======================= */
const GlobalStyles = () => (
  <style>{`
    :root{
      --bg:#f7fafb;
      --border:#e6edf3;
      --ink:#1f2937;
      --muted:#6b7280;
      --brand:#dc2626;  //red   
      --brand-soft:#fee2e2;
      --card:#ffffff;
      --radius:16px;
    }
    body{ background:var(--bg); color:var(--ink); }
    .dash-shell{ min-height:100vh; }
    /* Sidebar */
    .sidebar{ width:260px; background:var(--card); border-right:1px solid var(--border); position:sticky; top:0; height:100vh; padding:18px 14px; }
    .sidebar .brand{ font-weight:700; letter-spacing:.2px; }
    .s-nav .nav-link{ color:#334155; border-radius:12px; padding:.6rem .8rem; display:flex; align-items:center; gap:.7rem; }
    .s-nav .nav-link .bi{ font-size:1.1rem; }
    .s-nav .nav-link:hover{ background:#fee2e2; }
    .s-nav .nav-link.active{ background:var(--brand-soft); color:#dc2626; font-weight:600; }

    /* Topbar */
    .topbar{ background:var(--card); border-bottom:1px solid var(--border); position:sticky; top:0; z-index:10; }
    .btn-soft{ border-radius:12px; }
    .card-soft{ background:var(--card); border:1px solid var(--border); border-radius:var(--radius); }
    .label-muted{ color:var(--muted); font-size:.94rem; }
    .supplier-card:hover{ box-shadow:0 4px 18px rgba(16,24,40,.06); }
    .avatar{ width:36px; height:36px; border-radius:10px; background:#f1f5f9; display:grid; place-items:center; font-weight:700; }
  `}</style>
);

/* =======================
   Sidebar
======================= */
const Sidebar = ({ current, onNavigate }) => {
  const items = useMemo(
    () => [
      { key: "marketplace", label: "Marketplace", icon: "bi-shop" },
      { key: "orders", label: "Orders", icon: "bi-box-seam" },
      { key: "products", label: "Products", icon: "bi-bag" },
      { key: "analytics", label: "Analytics", icon: "bi-graph-up" },
      { key: "settings", label: "Settings", icon: "bi-gear" },
    ],
    []
  );

  return (
    <aside className="sidebar d-flex flex-column">
      <div className="d-flex align-items-center gap-2 mb-4 px-2">
        <span className="brand">bosta</span>
        <Badge bg="warning" text="dark" className="ms-1">business</Badge>
      </div>
      <Nav className="flex-column s-nav">
        {items.map((it) => (
          <Nav.Link
            key={it.key}
            className={current === it.key ? "active" : ""}
            onClick={() => onNavigate(it.key)}
          >
            <i className={`bi ${it.icon}`} />
            <span>{it.label}</span>
          </Nav.Link>
        ))}
      </Nav>

      {/* <div className="mt-auto px-2">
        <div className="card-soft p-3">
          <div className="fw-semibold mb-1">Getting Started</div>
          <div className="small text-muted">Create your first order</div>
          <div className="progress my-2" role="progressbar" aria-label="Onboarding" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-bar" style={{ width: "25%", background: "var(--brand)" }} />
          </div>
        </div>
      </div> */}
    </aside>
  );
};

/* =======================
   Topbar with Cart
======================= */
const Topbar = ({ cartCount, onOpenCart }) => {
  return (
    <div className="topbar">
      <Container fluid className="py-3">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <Button className="btn-soft" style={{ background: "var(--brand)", borderColor: "var(--brand)" }}>
              <i className="bi bi-plus-lg me-1" /> Create
            </Button>
            <Button variant="outline-secondary" className="btn-soft">
              <i className="bi bi-stars me-1" /> View Services
            </Button>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Button variant="outline-secondary" className="position-relative btn-soft" onClick={onOpenCart}>
              <i className="bi bi-cart3" />
              {cartCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </Badge>
              )}
            </Button>
            <i className="bi bi-bell fs-5" />
            <i className="bi bi-gear fs-5" />
            <div className="avatar">TT</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

/* =======================
   Demo data – 3 suppliers with products (EGP)
======================= */
const SUPPLIERS = [
  {
    id: "s1",
    name: "Nile Packaging Co.",
    rating: 4.7,
    tags: ["Packaging", "Labels"],
    leadTime: "3–5 days",
    minOrder: 50,
    location: "Cairo, EG",
    logoBg: "#e6fbf8",
    products: [
      { id: "p1", name: "Thermal Labels 100×150mm", price: 2.5, unit: "EGP/pc", sampleAvailable: true, samplePrice: 0 },
      { id: "p2", name: "Shipping Flyers A4", price: 1.2, unit: "EGP/pc", sampleAvailable: true, samplePrice: 0 },
    ],
  },
  {
    id: "s2",
    name: "Delta Print House",
    rating: 4.5,
    tags: ["Print", "Marketing"],
    leadTime: "2–4 days",
    minOrder: 100,
    location: "Alexandria, EG",
    logoBg: "#f5f3ff",
    products: [
      { id: "p3", name: "Business Cards (Matte)", price: 0.9, unit: "EGP/pc", sampleAvailable: true, samplePrice: 5 },
      { id: "p4", name: "Stickers 70×70mm", price: 0.6, unit: "EGP/pc", sampleAvailable: false, samplePrice: 0 },
    ],
  },
  {
    id: "s3",
    name: "Sahara Supplies",
    rating: 4.2,
    tags: ["Packaging", "Eco"],
    leadTime: "5–7 days",
    minOrder: 30,
    location: "Giza, EG",
    logoBg: "#fff7ed",
    products: [
      { id: "p5", name: "Kraft Boxes (Small)", price: 6.5, unit: "EGP/pc", sampleAvailable: true, samplePrice: 10 },
      { id: "p6", name: "Paper Filler 1kg", price: 75, unit: "EGP/kg", sampleAvailable: false, samplePrice: 0 },
    ],
  },
];

const ORDERS = [
  {
    id: 9283746528193746,
    date: "2025-08-20",
    progress: 45,
    total: 220,
    items: [
      { id: "p1", name: "Thermal Labels 100×150mm", price: 2.5, unit: "EGP/pc", qty: 50, total: 125 },
      { id: "p2", name: "Shipping Flyers A4", price: 1.2, unit: "EGP/pc", qty: 80, total: 95 }
    ]
  },
  {
    id: 5647382918374659,
    date: "2025-08-15",
    progress: 80,
    total: 210,
    items: [
      { id: "p3", name: "Business Cards (Matte)", price: 0.9, unit: "EGP/pc", qty: 150, total: 135 },
      { id: "p4", name: "Stickers 70×70mm", price: 0.6, unit: "EGP/pc", qty: 125, total: 75 }
    ]
  },
  {
    id: 8374651928374623,
    date: "2025-08-10",
    progress: 100,
    total: 395,
    items: [
      { id: "p5", name: "Kraft Boxes (Small)", price: 6.5, unit: "EGP/pc", qty: 50, total: 325 },
      { id: "p6", name: "Paper Filler 1kg", price: 75, unit: "EGP/kg", qty: 1, total: 75 }
    ]
  }
];

const LIKERT = ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"]



/* =======================
   Supplier Card & Modal
======================= */
const SupplierCard = ({ supplier, onOpen }) => (
  <Card className="card-soft supplier-card h-100">
    <Card.Body>
      <div className="d-flex align-items-start gap-3">
        <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width:48, height:48, background:supplier.logoBg }}>
          <i className="bi bi-box-seam" />
        </div>
        <div className="flex-grow-1">
          <div className="d-flex align-items-center justify-content-between mb-1">
            <h5 className="mb-0">{supplier.name}</h5>
            <div className="d-flex align-items-center gap-1 text-warning">
              <i className="bi bi-star-fill" /><span className="small text-dark">{supplier.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="label-muted mb-2">{supplier.location} • Lead time {supplier.leadTime} • MOQ {supplier.minOrder}</div>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {supplier.tags.map(t => <Badge bg="light" text="dark" key={t} className="border">{t}</Badge>)}
          </div>
          <div className="d-flex gap-2">
            <Button onClick={() => onOpen(supplier)} className="btn-soft" style={{ background:"var(--brand)", borderColor:"var(--brand)" }}>
              <i className="bi bi-bag-plus me-1"/> View Products
            </Button>
            <Button variant="outline-secondary" className="btn-soft">
              <i className="bi bi-chat-dots me-1"/> Contact
            </Button>
          </div>
        </div>
      </div>
    </Card.Body>
  </Card>
);

const SupplierModal = ({ supplier, show, onHide, onAdd, onSample }) => {
  const [qty, setQty] = useState({});
  if(!supplier) return null;

  const changeQty = (pid, v) => setQty(q => ({...q, [pid]: Math.max(1, Number(v)||1)}));

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {supplier.name} <span className="ms-2 label-muted fw-normal">{supplier.location} • Lead {supplier.leadTime}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="g-3">
          {supplier.products.map(p => (
            <Col md={6} key={p.id}>
              <Card className="card-soft h-100">
                <Card.Body>
                  <div className="d-flex align-items-start justify-content-between">
                    <div>
                      <h6 className="mb-1">{p.name}</h6>
                      <div className="label-muted">{p.price} {p.unit}</div>
                    </div>
                    <Badge bg="light" text="dark" className="border">SKU {p.id.toUpperCase()}</Badge>
                  </div>

                  <div className="d-flex align-items-end gap-2 mt-3">
                    <div style={{width:120}}>
                      <Form.Label className="label-muted">Qty</Form.Label>
                      <Form.Control type="number" min={1} value={qty[p.id]||1} onChange={e=>changeQty(p.id, e.target.value)} />
                    </div>
                    <Button className="btn-soft flex-grow-1" style={{ background:"var(--brand)", borderColor:"var(--brand)" }} onClick={() => onAdd(supplier, p, qty[p.id]||1)}>
                      <i className="bi bi-cart-plus me-1"/> Add to Cart
                    </Button>
                  </div>

                  <div className="mt-2 d-flex align-items-center justify-content-between">
                    <div className="label-muted">MOQ {supplier.minOrder}</div>
                    <Button variant="outline-secondary" className="btn-soft" disabled={!p.sampleAvailable} onClick={() => onSample(supplier, p)}>
                      <i className="bi bi-beaker me-1"/>
                      {p.sampleAvailable ? (p.samplePrice ? `Buy Sample (${p.samplePrice} EGP)` : "Request Free Sample") : "No Samples"}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Modal.Body>
    </Modal>
  );
};


/* =======================
   Order Card & Modal
======================= */

const OrderCard = ({ order, onView }) => (
  <Card className="card-soft order-card h-100">
    <Card.Body>
      <div className="d-flex align-items-start gap-3">
        <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width:48, height:48, background:"var(--brand-light)" }}>
          <i className="bi bi-receipt" />
        </div>
        <div className="flex-grow-1">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h5 className="mb-0">Order #{order.id}</h5>
          </div>
          <div className="mb-3">
            <Button onClick={() => onView(order)} className="btn-soft" style={{ background:"var(--brand)", borderColor:"var(--brand)" }}>
              <i className="bi bi-eye me-1"/> View Details
            </Button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-scooter fs-5 text-muted" />
            <div className="flex-grow-1">
              <div className="progress" style={{ height:8, borderRadius:4 }}>
              <div 
                  className={`progress-bar${order.progress === 100 ? " bg-success" : ""}`} 
                  role="progressbar" 
                  style={{ width:`${order.progress}%` }}>
                </div>
              </div>
            </div>
            <i className="bi bi-box-seam fs-5 text-muted" />
          </div>
        </div>
      </div>
    </Card.Body>
  </Card>
);

const OrderModal = ({ order, show, onHide }) => {
  const [review, setReview] = useState(null);
  const [notes, setNotes] = useState("")
  if (!order) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Order #{order.id} <span className="ms-2 label-muted fw-normal">{order.date}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 d-flex align-items-center gap-2">
          <i className="bi bi-scooter fs-5 text-muted" />
          <div className="flex-grow-1">
            <div className="progress" style={{ height:8, borderRadius:4 }}>
            <div 
                  className={`progress-bar${order.progress === 100 ? " bg-success" : ""}`} 
                  role="progressbar" 
                  style={{ width:`${order.progress}%` }}>
                </div>
            </div>
          </div>
          <i className="bi bi-box-seam fs-5 text-muted" />
        </div>

        

        <Row className="g-3">
          {order.items.map(item => (
            <Col md={6} key={item.id}>
              <Card className="card-soft h-100">
                <Card.Body>
                  <div className="d-flex align-items-start justify-content-between">
                    <div>
                      <h6 className="mb-1">{item.name}</h6>
                      <div className="label-muted">{item.price} {item.unit}</div>
                    </div>
                    <Badge bg="light" text="dark" className="border">SKU {item.id.toUpperCase()}</Badge>
                  </div>
                  <div className="mt-3 d-flex align-items-center justify-content-between">
                    <div className="label-muted">Qty {item.qty}</div>
                    <div className="fw-bold">{item.total} EGP</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {order.progress === 100 && (
          <div className="align-items-center justify-content-between mb-3">
            <br className="my-4" />
            <h2 className="mb-2">Review this order</h2>
            <hr className="my-4" />
            <div className="d-flex justify-content-between mb-3 px-3 py-4 rounded" style={{ backgroundColor: "#f1f3f5" }}>
              {[1,2,3,4,5].map(val => (
                <Form.Check
                  key={val}
                  type="radio"
                  name={`review-${order.id}`}
                  label={LIKERT[val - 1]}
                  checked={review === val}
                  onChange={() => setReview(val)}
                  className="fs-7 fw-semibold"
                />
              ))}
            </div>
            {review && (
              <div>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Additional notes..."
                  onChange={e => setNotes(e.target.value)}
                />
                <div className="mt-3">
                  <Button className="btn-soft" style={{ background:"var(--brand)", borderColor:"var(--brand)" }} onClick={() => {
                        alert("✔️ Review Submitted! This is a demo review.");
                        setReview(null);
                        setNotes("");
                        onHide();
                      }
                    }>
                    Submit Review
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

      </Modal.Body>
      <Modal.Footer>
        <div className="fw-bold me-auto">Total: {order.total} EGP</div>
        <Button variant="outline-secondary" className="btn-soft" onClick={onHide}>
          <i className="bi bi-x-circle me-1"/> Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};




/* =======================
   Cart Offcanvas
======================= */
const CartPanel = ({ show, onHide, items, onChangeQty, onRemove, onCheckout, onClear }) => {
  const subtotal = items.reduce((s, it) => s + (it.isSample ? (it.samplePrice||0) : it.price * it.qty), 0);
  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart ({items.length})</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {items.length === 0 ? (
          <div className="label-muted">Your cart is empty.</div>
        ) : (
          <>
            <Table hover responsive className="align-middle">
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Product</th>
                  <th style={{width:90}}>Qty</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={idx}>
                    <td>{it.supplierName}</td>
                    <td>
                      {it.productName}
                      {it.isSample && <Badge bg="info" className="ms-2">Sample</Badge>}
                    </td>
                    <td>
                      {!it.isSample ? (
                        <Form.Control type="number" min={1} value={it.qty} onChange={e=>onChangeQty(idx, Number(e.target.value)||1)} />
                      ) : (
                        <span className="label-muted">—</span>
                      )}
                    </td>
                    <td>
                      {it.isSample ? `${it.samplePrice||0} EGP` : `${(it.price * it.qty).toFixed(2)} EGP`}
                      <div className="small text-muted">{!it.isSample ? `${it.price} EGP/unit` : ""}</div>
                    </td>
                    <td>
                      <Button variant="link" className="text-danger p-0" onClick={()=>onRemove(idx)}><i className="bi bi-x-lg"/></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex align-items-center justify-content-between mt-3">
              <div className="fw-semibold">Subtotal</div>
              <div className="fw-semibold">{subtotal.toFixed(2)} EGP</div>
            </div>
            <div className="d-flex gap-2 mt-3">
              <Button variant="outline-secondary" className="btn-soft" onClick={onClear}>Clear</Button>
              <Button className="btn-soft flex-grow-1" style={{ background:"var(--brand)", borderColor:"var(--brand)" }} onClick={onCheckout}>
                <i className="bi bi-bag-check me-1"/> Checkout
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

/* =======================
   Marketplace Page – search suppliers, view products, add to cart or request samples
======================= */
const MarketplacePage = ({ onAddToCart, onAddSample }) => {
  const [query, setQuery] = useState("");
  const [activeSupplier, setActiveSupplier] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if(!q) return SUPPLIERS;
    return SUPPLIERS.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q)) ||
      s.products.some(p => p.name.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <Container fluid className="py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="mb-0">Marketplace – Suppliers</h4>
      </div>

      <InputGroup className="mb-4">
        <InputGroup.Text className="bg-white border-0 border-end"><i className="bi bi-search"/></InputGroup.Text>
        <Form.Control className="card-soft" placeholder="Search suppliers, categories, or products…" value={query} onChange={e=>setQuery(e.target.value)} />
        {query && (
          <Button variant="light" onClick={()=>setQuery("")}><i className="bi bi-x-lg"/></Button>
        )}
      </InputGroup>

      <Row className="g-4">
        {filtered.map(s => (
          <Col md={6} lg={4} key={s.id}>
            <SupplierCard supplier={s} onOpen={setActiveSupplier} />
          </Col>
        ))}
        {filtered.length === 0 && (
          <Col xs={12}>
            <div className="card-soft p-4 text-center label-muted">No suppliers match “{query}”. Try another term.</div>
          </Col>
        )}
      </Row>

      <SupplierModal
        supplier={activeSupplier}
        show={!!activeSupplier}
        onHide={()=>setActiveSupplier(null)}
        onAdd={(s, p, q)=>{ onAddToCart(s, p, q); setActiveSupplier(null); }}
        onSample={(s,p)=>{ onAddSample(s,p); }}
      />
    </Container>
  );
};


/* =======================
   Orders Page – view completed orders and current order status
======================= */
const OrdersPage = () => {
  const [query, setQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);


  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if(!q) return SUPPLIERS;
    return SUPPLIERS.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q)) ||
      s.products.some(p => p.name.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <Container fluid className="py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="mb-0">Orders</h4>
      </div>

      

      <Row className="g-3">
        {ORDERS.map(order => (
          <Col md={6} key={order.id}>
            <OrderCard order={order} onView={(o) => setSelectedOrder(o)} />
          </Col>
        ))}
      </Row>

      <OrderModal
        order={selectedOrder}
        show={!!selectedOrder}
        onHide={() => setSelectedOrder(null)}
      />

      
    </Container>
  );
};


/* =======================
   App Shell
======================= */
export default function App(){
  const [route, setRoute] = useState("marketplace");

  // Cart state
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]); // {supplierId, supplierName, productId, productName, qty, price, isSample, samplePrice}

  const addToCart = (supplier, product, qty) => {
    setCart(prev => {
      const idx = prev.findIndex(it => !it.isSample && it.productId===product.id && it.supplierId===supplier.id);
      if(idx>-1){
        const copy=[...prev];
        copy[idx]={...copy[idx], qty: copy[idx].qty + qty};
        return copy;
      }
      return [...prev, { supplierId:supplier.id, supplierName:supplier.name, productId:product.id, productName:product.name, qty, price:product.price, isSample:false }];
    });
    setCartOpen(true);
  };

  const addSample = (supplier, product) => {
    setCart(prev => [...prev, { supplierId:supplier.id, supplierName:supplier.name, productId:product.id+"-sample", productName:product.name, qty:1, price:0, isSample:true, samplePrice:product.samplePrice||0 }]);
    setCartOpen(true);
  };

  const changeQty = (idx, q) => setCart(prev => prev.map((it,i)=> i===idx? {...it, qty: Math.max(1,q)}:it));
  const removeItem = (idx) => setCart(prev => prev.filter((_,i)=>i!==idx));
  const clearCart = () => setCart([]);

  const checkout = () => {
    alert("✔️ Order placed! This is a demo checkout.");
    setCart([]);
    setCartOpen(false);
  };

  const cartCount = cart.reduce((s,it)=> s + (it.isSample?1:it.qty), 0);

  // Simple route switcher – only Marketplace live for this demo
  const Page = useMemo(() => {
    switch(route){
      case "orders":
        return() => (
          <OrdersPage />
        )
      case "marketplace": default:
        return () => (
          <MarketplacePage onAddToCart={addToCart} onAddSample={addSample} />
        )
    }
  }, [route]);

  const Current = Page;

  return (
    <div className="dash-shell d-flex">
      <GlobalStyles />
      <Sidebar current={route} onNavigate={setRoute} />
      <div className="flex-grow-1">
        <Topbar cartCount={cartCount} onOpenCart={()=>setCartOpen(true)} />
        <Current />
      </div>

      <CartPanel
        show={cartOpen}
        onHide={()=>setCartOpen(false)}
        items={cart}
        onChangeQty={changeQty}
        onRemove={removeItem}
        onClear={clearCart}
        onCheckout={checkout}
      />
    </div>
  );
}
