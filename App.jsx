import React, { useState, useEffect, useRef } from 'react';
import {
  Gauge,
  Wrench,
  ShoppingBag,
  Users,
  Newspaper,
  Activity,
  Plus,
  Trash2,
  Share2,
  Menu,
  X,
  ChevronRight,
  Award,
  Shield,
  Calendar,
  Download,
  Cpu,
  Book,
  MessageCircle,
  Instagram,
  Facebook,
  FileText,
  Lock,
  CheckCircle2,
  AlertCircle,
  ShoppingCart,
  CreditCard,
  Settings,
  ExternalLink,
  Check
} from 'lucide-react';

// EnergicaLogo SVG Component
const EnergicaLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 10 L70 40 L55 40 L65 70 L35 45 L50 45 L40 10 Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

// GoogleIcon SVG Component
const GoogleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// Toast Notification Component
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-20 md:top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg border backdrop-blur-sm animate-slide-in ${
      type === 'success'
        ? 'bg-lime-500/90 border-lime-400 text-black'
        : type === 'error'
        ? 'bg-red-500/90 border-red-400 text-white'
        : 'bg-zinc-800/90 border-zinc-700 text-zinc-200'
    }`}>
      {type === 'success' && <CheckCircle2 className="w-5 h-5" />}
      {type === 'error' && <AlertCircle className="w-5 h-5" />}
      <p className="font-semibold">{message}</p>
      <button onClick={onClose} className="ml-2">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Three.js 3D Viewer Component
const ThreeDViewer = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const bikeGroupRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.THREE || !containerRef.current) return;

    const THREE = window.THREE;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(3, 2, 4);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const bikeGroup = new THREE.Group();
    bikeGroupRef.current = bikeGroup;

    const bodyGeometry = new THREE.BoxGeometry(1.2, 0.8, 2.8);
    const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x84cc16, wireframe: true, wireframeLinewidth: 2 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    bikeGroup.add(body);

    const wheelGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.2, 16);
    const wheelMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

    const frontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontWheel.rotation.z = Math.PI / 2;
    frontWheel.position.set(0.7, 0.3, 1.2);
    bikeGroup.add(frontWheel);

    const rearWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rearWheel.rotation.z = Math.PI / 2;
    rearWheel.position.set(0.7, 0.3, -1.2);
    bikeGroup.add(rearWheel);

    const handlebarGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.4, 8);
    const handlebarMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const handlebars = new THREE.Mesh(handlebarGeometry, handlebarMaterial);
    handlebars.rotation.z = Math.PI / 2;
    handlebars.position.set(0, 1.2, 1.3);
    bikeGroup.add(handlebars);

    scene.add(bikeGroup);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isDraggingRef.current) {
        rotationRef.current.y += 0.002;
      }
      bikeGroup.rotation.x = rotationRef.current.x;
      bikeGroup.rotation.y = rotationRef.current.y;
      renderer.render(scene, camera);
    };
    animate();

    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMouseRef.current = {
        x: e.clientX || e.touches?.[0]?.clientX || 0,
        y: e.clientY || e.touches?.[0]?.clientY || 0
      };
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
      const clientY = e.clientY || e.touches?.[0]?.clientY || 0;
      const deltaX = clientX - previousMouseRef.current.x;
      const deltaY = clientY - previousMouseRef.current.y;
      rotationRef.current.y += deltaX * 0.01;
      rotationRef.current.x += deltaY * 0.01;
      rotationRef.current.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, rotationRef.current.x));
      previousMouseRef.current = { x: clientX, y: clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onMouseDown);
    container.addEventListener('touchmove', onMouseMove);
    container.addEventListener('touchend', onMouseUp);

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onMouseDown);
      container.removeEventListener('touchmove', onMouseMove);
      container.removeEventListener('touchend', onMouseUp);
      if (renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" style={{ minHeight: '300px' }} />;
};

// Main App Component
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bikes, setBikes] = useState([]);
  const [activeBikeId, setActiveBikeId] = useState(null);
  const [showAddBikeModal, setShowAddBikeModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState(null);
  const [newBike, setNewBike] = useState({
    model: 'EGO+ RS',
    vin: '',
    year: new Date().getFullYear(),
    color: '',
    kms: '',
    trim: 'Standard'
  });
  const [shopFilter, setShopFilter] = useState('ALL');
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const products = [
    { id: 1, name: 'Carbon Rearsets', category: 'CORSA', price: 850, icon: '🏍️', description: 'Ultra-lightweight carbon fiber rearsets for ultimate track performance' },
    { id: 2, name: 'Track Day Pass', category: 'CORSA', price: 300, icon: '🏁', description: 'Full-day professional circuit access with telemetry support' },
    { id: 3, name: 'Touring Panniers', category: 'STRADA', price: 1200, icon: '🧳', description: 'Premium waterproof luggage system for long-distance adventures' },
    { id: 4, name: 'Fast Charge Kit', category: 'STRADA', price: 450, icon: '⚡', description: 'Portable fast charging solution for the road' },
    { id: 5, name: 'Energica Espresso', category: 'STILE', price: 1800, icon: '☕', description: 'Limited edition Energica x Bezzera espresso machine' },
    { id: 6, name: 'Modena Balsamic', category: 'STILE', price: 120, icon: '🍇', description: '25-year aged balsamic from Motor Valley' }
  ];

  const newsItems = [
    { id: 1, source: 'Instagram', time: '2h ago', headline: 'EsseEsse9 spotted testing at Mugello Circuit', image: 'bg-lime-500/20', link: 'https://instagram.com/energicamotorcycles' },
    { id: 2, source: 'Press Release', time: '1d ago', headline: 'Energica announces partnership with MotoE World Cup', image: 'bg-cyan-500/20', link: 'https://energica.com' },
    { id: 3, source: 'Community', time: '3d ago', headline: 'Owner crosses 100,000km milestone on Eva Ribelle', image: 'bg-purple-500/20', link: 'https://energica.com' },
    { id: 4, source: 'Instagram', time: '5d ago', headline: 'Behind the scenes: Battery pack manufacturing', image: 'bg-amber-500/20', link: 'https://instagram.com/energicamotorcycles' }
  ];

  const badges = [
    { id: 1, name: 'Pioneer', icon: '🚀', unlocked: true },
    { id: 2, name: 'High Voltage', icon: '⚡', unlocked: true },
    { id: 3, name: 'Track Star', icon: '🏁', unlocked: false },
    { id: 4, name: 'Globetrotter', icon: '🌍', unlocked: true }
  ];

  const mockUsers = [
    { id: 1, name: 'Marco Rossi', email: 'marco@example.com', role: 'Owner', status: 'Active' },
    { id: 2, name: 'Admin User', email: 'admin@energica.com', role: 'Admin', status: 'Active' },
    { id: 3, name: 'Lucia Verde', email: 'lucia@example.com', role: 'Owner', status: 'Active' },
    { id: 4, name: 'Paolo Bianchi', email: 'paolo@example.com', role: 'Owner', status: 'Inactive' }
  ];

  // Initialize Firebase
  useEffect(() => {
    if (typeof firebase !== 'undefined' && firebase.apps.length === 0) {
      try {
        const firebaseConfig = {
          apiKey: "AIzaSyCaqW8-mdPLbLLcLSITczUYZIwPSXLquYM",
          authDomain: "energica-admin.firebaseapp.com",
          projectId: "energica-admin",
          storageBucket: "energica-admin.firebasestorage.app",
          messagingSenderId: "140963133320",
          appId: "1:140963133320:web:95988e29471cc600ca6c3d"
        };
        firebase.initializeApp(firebaseConfig);
        setFirebaseInitialized(true);
      } catch (error) {
        console.warn('Firebase initialization failed:', error);
      }
    } else if (typeof firebase !== 'undefined') {
      setFirebaseInitialized(true);
    }
    setLoading(false);
  }, []);

  // Auth listener
  useEffect(() => {
    if (!firebaseInitialized || typeof firebase === 'undefined') return;

    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          isAdmin: firebaseUser.email === 'admin@energica.com'
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebaseInitialized]);

  // Garage listener
  useEffect(() => {
    if (!user || !firebaseInitialized || typeof firebase === 'undefined') {
      setBikes([]);
      setActiveBikeId(null);
      return;
    }

    const db = firebase.firestore();
    const garageRef = db.collection('artifacts')
      .doc('energica-portal')
      .collection('users')
      .doc(user.uid)
      .collection('garage');

    const unsubscribe = garageRef.onSnapshot(
      (snapshot) => {
        const bikesData = [];
        snapshot.forEach((doc) => {
          bikesData.push({ id: doc.id, ...doc.data() });
        });
        setBikes(bikesData);

        if (bikesData.length > 0 && !activeBikeId) {
          setActiveBikeId(bikesData[0].id);
        } else if (bikesData.length === 0) {
          setActiveBikeId(null);
        } else if (activeBikeId && !bikesData.find(b => b.id === activeBikeId)) {
          setActiveBikeId(bikesData[0].id);
        }
      },
      (error) => {
        console.error('Error fetching garage:', error);
      }
    );

    return () => unsubscribe();
  }, [user, firebaseInitialized, activeBikeId]);

  // Auth functions
  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (email === 'admin@energica.com' && password === 'admin') {
      setUser({
        uid: 'admin-uid',
        email: 'admin@energica.com',
        displayName: 'Admin',
        isAdmin: true
      });
      showToast('Welcome back, Admin!');
      return;
    }

    if (!firebaseInitialized || typeof firebase === 'undefined') {
      showToast('Use admin@energica.com / admin for demo', 'info');
      return;
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      showToast('Login successful!');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleGoogleLogin = async () => {
    if (!firebaseInitialized || typeof firebase === 'undefined') {
      showToast('Firebase not available', 'error');
      return;
    }

    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      showToast('Google login successful!');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleAnonymousLogin = async () => {
    // Always use demo mode for guest login (no Firebase required)
    setUser({
      uid: 'guest-' + Date.now(),
      email: 'guest@demo.com',
      displayName: 'Guest',
      isAdmin: false
    });
    showToast('Logged in as Guest');
  };

  const handleLogout = async () => {
    if (firebaseInitialized && typeof firebase !== 'undefined') {
      await firebase.auth().signOut();
    }
    setUser(null);
    setBikes([]);
    setActiveBikeId(null);
    setCurrentPage('dashboard');
    setCart([]);
    showToast('Logged out successfully');
  };

  // Garage functions
  const handleAddBike = async (e) => {
    e.preventDefault();

    if (!newBike.model || !newBike.vin || !newBike.year) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (!firebaseInitialized || typeof firebase === 'undefined') {
      const bikeId = 'bike-' + Date.now();
      const bikeData = { ...newBike, vin: newBike.vin.toUpperCase(), createdAt: new Date().toISOString() };
      setBikes([...bikes, { id: bikeId, ...bikeData }]);
      if (!activeBikeId) setActiveBikeId(bikeId);
      setShowAddBikeModal(false);
      setNewBike({ model: 'EGO+ RS', vin: '', year: new Date().getFullYear(), color: '', kms: '', trim: 'Standard' });
      showToast('Bike added to garage!');
      return;
    }

    try {
      const db = firebase.firestore();
      const garageRef = db.collection('artifacts')
        .doc('energica-portal')
        .collection('users')
        .doc(user.uid)
        .collection('garage');

      const bikeData = {
        ...newBike,
        vin: newBike.vin.toUpperCase(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      await garageRef.add(bikeData);
      setShowAddBikeModal(false);
      setNewBike({ model: 'EGO+ RS', vin: '', year: new Date().getFullYear(), color: '', kms: '', trim: 'Standard' });
      showToast('Bike added to garage!');
    } catch (error) {
      showToast('Failed to add bike: ' + error.message, 'error');
    }
  };

  const handleDeleteBike = async (bikeId) => {
    if (!confirm('Are you sure you want to remove this bike from your garage?')) return;

    if (!firebaseInitialized || typeof firebase === 'undefined') {
      setBikes(bikes.filter(b => b.id !== bikeId));
      if (activeBikeId === bikeId) {
        const remaining = bikes.filter(b => b.id !== bikeId);
        setActiveBikeId(remaining.length > 0 ? remaining[0].id : null);
      }
      showToast('Bike removed from garage');
      return;
    }

    try {
      const db = firebase.firestore();
      await db.collection('artifacts')
        .doc('energica-portal')
        .collection('users')
        .doc(user.uid)
        .collection('garage')
        .doc(bikeId)
        .delete();
      showToast('Bike removed from garage');
    } catch (error) {
      showToast('Failed to delete bike: ' + error.message, 'error');
    }
  };

  // Cart functions
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    showToast(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    showToast('Item removed from cart');
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Share referral
  const shareReferral = () => {
    const referralLink = 'https://energica.com/refer/ENER-8892';
    if (navigator.share) {
      navigator.share({
        title: 'Join Energica',
        text: 'Use my referral code to get exclusive benefits!',
        url: referralLink
      }).then(() => showToast('Referral link shared!'))
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(referralLink);
      showToast('Referral link copied to clipboard!');
    }
  };

  const activeBike = bikes.find(b => b.id === activeBikeId);
  const filteredProducts = shopFilter === 'ALL' ? products : products.filter(p => p.category === shopFilter);

  const navItems = [
    { id: 'service', label: 'Service', icon: Wrench },
    { id: 'shop', label: 'Bottega', icon: ShoppingBag },
    { id: 'dashboard', label: 'Dashboard', icon: Gauge, isHome: true },
    { id: 'patron', label: 'Patron', icon: Users },
    { id: 'news', label: 'News', icon: Newspaper },
  ];

  if (user?.isAdmin) {
    navItems.push({ id: 'admin', label: 'God Mode', icon: Activity });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <EnergicaLogo className="w-16 h-16 text-lime-500 animate-pulse mx-auto mb-4" />
          <p className="text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <EnergicaLogo className="w-20 h-20 text-lime-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-zinc-200">
              <span className="italic">Energica</span> Portal
            </h1>
            <p className="text-zinc-500 mt-2">Owner's Dashboard</p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 mb-4">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded px-4 py-2 text-zinc-200 focus:outline-none focus:border-lime-500 transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded px-4 py-2 text-zinc-200 focus:outline-none focus:border-lime-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-lime-500 text-black font-semibold py-3 rounded hover:bg-lime-400 transition-colors"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 space-y-3">
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white text-gray-900 font-medium py-3 rounded flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
              >
                <GoogleIcon />
                Continue with Google
              </button>
              <button
                onClick={handleAnonymousLogin}
                className="w-full bg-zinc-800 text-zinc-200 font-medium py-3 rounded hover:bg-zinc-700 transition-colors"
              >
                Continue as Guest
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-zinc-500">
            <p>Demo: admin@energica.com / admin</p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Page
  const DashboardPage = () => (
    <div className="space-y-6 pb-24 md:pb-6">
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="h-64 md:h-80">
          <ThreeDViewer />
        </div>
      </div>

      {activeBike ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-lime-500 mb-4">{activeBike.model}</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-zinc-500">VIN</p><p className="text-zinc-200 font-mono">{activeBike.vin}</p></div>
            <div><p className="text-zinc-500">Year</p><p className="text-zinc-200">{activeBike.year}</p></div>
            <div><p className="text-zinc-500">Color</p><p className="text-zinc-200">{activeBike.color || 'Not specified'}</p></div>
            <div><p className="text-zinc-500">Trim</p><p className="text-zinc-200">{activeBike.trim}</p></div>
            <div className="col-span-2"><p className="text-zinc-500">Kilometers</p><p className="text-zinc-200 text-2xl font-mono">{activeBike.kms || '0'} km</p></div>
          </div>
        </div>
      ) : (
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-8 text-center">
          <p className="text-zinc-500 mb-4">No bikes in your garage</p>
          <button
            onClick={() => setShowAddBikeModal(true)}
            className="bg-lime-500 text-black px-6 py-2 rounded font-semibold hover:bg-lime-400 transition-colors"
          >
            Add Your First Energica
          </button>
        </div>
      )}

      <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-zinc-200">My Garage</h3>
          <button
            onClick={() => setShowAddBikeModal(true)}
            className="bg-lime-500 text-black p-2 rounded-full hover:bg-lime-400 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {bikes.map((bike) => (
            <div
              key={bike.id}
              onClick={() => setActiveBikeId(bike.id)}
              className={`flex-shrink-0 w-48 bg-black border rounded-lg p-4 cursor-pointer transition-all ${
                activeBikeId === bike.id
                  ? 'border-lime-500 ring-2 ring-lime-500/20'
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-zinc-200 text-sm">{bike.model}</h4>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBike(bike.id);
                  }}
                  className="text-zinc-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-zinc-500 font-mono">{bike.vin.substring(0, 10)}...</p>
              <p className="text-xs text-zinc-400 mt-2">{bike.kms || '0'} km</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Wrench className="w-5 h-5 text-lime-500" />
            <h4 className="font-semibold text-zinc-200">Service Status</h4>
          </div>
          <p className="text-2xl font-bold text-lime-500">Up to date</p>
          <p className="text-sm text-zinc-500 mt-1">Next service in 3,200 km</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-lime-500" />
            <h4 className="font-semibold text-zinc-200">Patron Tier</h4>
          </div>
          <p className="text-2xl font-bold text-amber-500">GOLD</p>
          <p className="text-sm text-zinc-500 mt-1">2 referrals to Platinum</p>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-zinc-200 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-lime-500" />
          Trophy Cabinet
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`bg-black border rounded-lg p-4 text-center transition-all ${
                badge.unlocked ? 'border-lime-500/30' : 'border-zinc-800 opacity-50'
              }`}
            >
              <div className="text-4xl mb-2 relative">
                {badge.icon}
                {!badge.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-zinc-700" />
                  </div>
                )}
              </div>
              <p className="text-sm font-semibold text-zinc-200">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Service Page
  const ServicePage = () => (
    <div className="space-y-6 pb-24 md:pb-6">
      <h1 className="text-3xl font-bold text-zinc-200">Service</h1>

      <div className="bg-zinc-950 border border-lime-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-lime-500" />
          <h2 className="text-xl font-bold text-zinc-200">Warranty Status</h2>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="w-8 h-8 text-lime-500" />
          <div>
            <p className="text-2xl font-bold text-lime-500">ACTIVE</p>
            <p className="text-sm text-zinc-400">Expires: December 31, 2026</p>
          </div>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-zinc-200 mb-4">Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a
            href="https://energica.com/manuals"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-lime-500 text-black font-semibold py-4 px-6 rounded-lg hover:bg-lime-400 transition-colors flex items-center justify-between"
          >
            <span className="flex items-center gap-3">
              <Download className="w-5 h-5" />
              Manuals
            </span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://energica.com/parts"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-lime-500 text-black font-semibold py-4 px-6 rounded-lg hover:bg-lime-400 transition-colors flex items-center justify-between"
          >
            <span className="flex items-center gap-3">
              <Cpu className="w-5 h-5" />
              Parts
            </span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={() => showToast('Telemetry feature coming soon!')}
            className="bg-zinc-800 text-zinc-200 font-medium py-4 px-6 rounded-lg hover:bg-zinc-700 transition-colors flex items-center justify-between"
          >
            <span className="flex items-center gap-3">
              <Activity className="w-5 h-5" />
              Telemetry
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => showToast('DIY Guides coming soon!')}
            className="bg-zinc-800 text-zinc-200 font-medium py-4 px-6 rounded-lg hover:bg-zinc-700 transition-colors flex items-center justify-between"
          >
            <span className="flex items-center gap-3">
              <Book className="w-5 h-5" />
              DIY Guides
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-zinc-200 mb-4">Live Support</h2>
        <a
          href="https://wa.me/390000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <MessageCircle className="w-5 h-5" />
              <span>Start WhatsApp Chat</span>
            </div>
            <p className="text-sm text-green-100">Connect with an Energica Expert</p>
          </div>
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </div>
  );

  // Shop Page
  const ShopPage = () => (
    <div className="space-y-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-200">Bottega</h1>
        <button
          onClick={() => setShowCart(true)}
          className="relative bg-lime-500 text-black p-3 rounded-full hover:bg-lime-400 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['ALL', 'CORSA', 'STRADA', 'STILE'].map((filter) => (
          <button
            key={filter}
            onClick={() => setShopFilter(filter)}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-colors ${
              shopFilter === filter
                ? 'bg-lime-500 text-black'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors"
          >
            <div className="relative">
              <div className="text-6xl mb-4">{product.icon}</div>
              <span className="absolute top-0 right-0 bg-lime-500 text-black text-xs font-semibold px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
            <h3 className="text-xl font-bold text-zinc-200 mb-2">{product.name}</h3>
            <p className="text-zinc-400 text-sm mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-lime-500">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-lime-500 text-black px-4 py-2 rounded font-semibold hover:bg-lime-400 transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Patron Page
  const PatronPage = () => (
    <div className="space-y-6 pb-24 md:pb-6">
      <h1 className="text-3xl font-bold text-zinc-200">Patron Program</h1>

      <div className="bg-gradient-to-br from-amber-500/20 to-zinc-950 border border-amber-500/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-zinc-400 mb-1">Current Tier</p>
            <h2 className="text-4xl font-bold text-amber-500">GOLD</h2>
          </div>
          <Award className="w-16 h-16 text-amber-500" />
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-zinc-400">Referrals</span>
            <span className="text-zinc-200 font-semibold">3 / 5</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: '60%' }} />
          </div>
        </div>

        <p className="text-zinc-400 text-sm">
          2 more referrals to unlock <span className="font-semibold text-cyan-400">PLATINUM</span> tier
        </p>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-zinc-200 mb-4">Your Referral Code</h3>
        <div className="bg-black border border-lime-500/30 rounded-lg p-6 mb-4">
          <p className="text-4xl font-bold text-lime-500 text-center tracking-wider font-mono">
            ENER-8892
          </p>
        </div>
        <button
          onClick={shareReferral}
          className="w-full bg-lime-500 text-black font-semibold py-3 rounded-lg hover:bg-lime-400 transition-colors flex items-center justify-center gap-2"
        >
          <Share2 className="w-5 h-5" />
          Share Link
        </button>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-zinc-200 mb-4">Tier Benefits</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded">
            <CheckCircle2 className="w-5 h-5 text-lime-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-zinc-200 font-semibold">Priority Support</p>
              <p className="text-sm text-zinc-400">24/7 dedicated support line</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded">
            <CheckCircle2 className="w-5 h-5 text-lime-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-zinc-200 font-semibold">Exclusive Merchandise</p>
              <p className="text-sm text-zinc-400">20% off in Bottega</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded">
            <CheckCircle2 className="w-5 h-5 text-lime-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-zinc-200 font-semibold">Track Day Access</p>
              <p className="text-sm text-zinc-400">Complimentary entry to events</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // News Page
  const NewsPage = () => (
    <div className="space-y-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-200">News</h1>
        <div className="flex gap-3">
          <a href="https://instagram.com/energicamotorcycles" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-lime-500 transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="https://facebook.com/energicamotor" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-lime-500 transition-colors">
            <Facebook className="w-6 h-6" />
          </a>
          <button onClick={() => showToast('Opening press releases...')} className="text-zinc-400 hover:text-lime-500 transition-colors">
            <Newspaper className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {newsItems.map((item) => (
          <div key={item.id} className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
            <div className={`w-full h-48 ${item.image}`} />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-lime-500/20 text-lime-500 text-xs font-semibold px-2 py-1 rounded">
                  {item.source}
                </span>
                <span className="text-zinc-500 text-sm">{item.time}</span>
              </div>
              <h3 className="text-xl font-semibold text-zinc-200 mb-3">{item.headline}</h3>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
              >
                Read Story
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Admin Page
  const AdminPage = () => (
    <div className="space-y-6 pb-24 md:pb-6">
      <h1 className="text-3xl font-bold text-purple-400">God Mode</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-purple-500/20 to-zinc-950 border border-purple-500/30 rounded-lg p-6">
          <p className="text-sm text-zinc-400 mb-1">Total Owners</p>
          <p className="text-4xl font-bold text-purple-400">1,247</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-zinc-950 border border-purple-500/30 rounded-lg p-6">
          <p className="text-sm text-zinc-400 mb-1">Fleet Uptime</p>
          <p className="text-4xl font-bold text-purple-400">98.7%</p>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-200">User Registry</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-900">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-zinc-400">Name</th>
                <th className="text-left p-4 text-sm font-semibold text-zinc-400">Email</th>
                <th className="text-left p-4 text-sm font-semibold text-zinc-400">Role</th>
                <th className="text-left p-4 text-sm font-semibold text-zinc-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((mockUser) => (
                <tr key={mockUser.id} className="border-t border-zinc-800 hover:bg-zinc-900/50">
                  <td className="p-4 text-zinc-200">{mockUser.name}</td>
                  <td className="p-4 text-zinc-400 font-mono text-sm">{mockUser.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      mockUser.role === 'Admin'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {mockUser.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      mockUser.status === 'Active'
                        ? 'bg-lime-500/20 text-lime-500'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      {mockUser.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'service': return <ServicePage />;
      case 'shop': return <ShopPage />;
      case 'patron': return <PatronPage />;
      case 'news': return <NewsPage />;
      case 'admin': return user?.isAdmin ? <AdminPage /> : <DashboardPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-200">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-zinc-950 border-b border-zinc-800 z-50">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-zinc-400 hover:text-lime-500 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <EnergicaLogo className="w-8 h-8 text-lime-500" />
          <div className="w-6" />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/80 z-50"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-80 max-w-[85vw] h-full bg-zinc-950 border-r border-zinc-800 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <EnergicaLogo className="w-8 h-8 text-lime-500" />
                <span className="font-bold text-lg italic">Energica</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-zinc-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 border-b border-zinc-800">
              <p className="text-sm text-zinc-500 mb-2">Account</p>
              <div className="space-y-2">
                <button
                  onClick={() => { showToast('Profile settings coming soon!'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded hover:bg-zinc-900 transition-colors text-zinc-200"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4" />
                    Profile Settings
                  </div>
                </button>
                <button
                  onClick={() => { showToast('Payment methods coming soon!'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded hover:bg-zinc-900 transition-colors text-zinc-200"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4" />
                    Payment Methods
                  </div>
                </button>
              </div>
            </div>

            {user?.isAdmin && (
              <div className="p-4 border-b border-zinc-800">
                <p className="text-sm text-zinc-500 mb-2">Admin</p>
                <button
                  onClick={() => {
                    setCurrentPage('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded hover:bg-purple-500/10 transition-colors text-purple-400 font-semibold"
                >
                  Open God Mode
                </button>
              </div>
            )}

            <div className="p-4">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500/10 text-red-500 font-semibold py-3 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 bottom-0 w-64 bg-zinc-950 border-r border-zinc-800 overflow-y-auto">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3 mb-6">
            <EnergicaLogo className="w-10 h-10 text-lime-500" />
            <span className="font-bold text-xl italic">Energica</span>
          </div>
          <div className="text-sm">
            <p className="text-zinc-500">Signed in as</p>
            <p className="text-zinc-200 font-semibold truncate">{user.email}</p>
          </div>
        </div>

        <nav className="p-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                currentPage === item.id
                  ? 'bg-lime-500 text-black font-semibold'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500/10 text-red-500 font-semibold py-3 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 pt-20 md:pt-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {renderPage()}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 z-40">
        <div className="flex items-end justify-around p-2">
          {navItems.slice(0, 5).map((item) => {
            const isHome = item.isHome;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex flex-col items-center transition-all ${isHome ? '-mt-6' : 'pt-2'}`}
              >
                <div className={`flex items-center justify-center rounded-full transition-all ${
                  isHome
                    ? 'w-16 h-16 bg-lime-500 text-black shadow-lg shadow-lime-500/20'
                    : isActive
                    ? 'w-12 h-12 bg-lime-500/20 text-lime-500'
                    : 'w-12 h-12 text-zinc-500'
                }`}>
                  <item.icon className={isHome ? 'w-8 h-8' : 'w-6 h-6'} />
                </div>
                {!isHome && (
                  <span className={`text-xs mt-1 ${isActive ? 'text-lime-500 font-semibold' : 'text-zinc-500'}`}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-zinc-950">
              <h2 className="text-xl font-bold text-zinc-200">Shopping Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-zinc-400 hover:text-zinc-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {cart.length === 0 ? (
                <p className="text-zinc-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-black rounded-lg">
                        <div className="text-4xl">{item.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-zinc-200">{item.name}</h3>
                          <p className="text-sm text-zinc-400">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lime-500">${item.price * item.quantity}</p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-zinc-800 pt-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-zinc-200">Total:</span>
                      <span className="text-2xl font-bold text-lime-500">${cartTotal}</span>
                    </div>
                    <button
                      onClick={() => {
                        showToast('Checkout coming soon!');
                        setShowCart(false);
                      }}
                      className="w-full bg-lime-500 text-black font-semibold py-3 rounded-lg hover:bg-lime-400 transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Bike Modal */}
      {showAddBikeModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-zinc-200">Add Energica</h2>
              <button
                onClick={() => setShowAddBikeModal(false)}
                className="text-zinc-400 hover:text-zinc-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddBike} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Model *</label>
                <select
                  value={newBike.model}
                  onChange={(e) => setNewBike({ ...newBike, model: e.target.value })}
                  className="w-full bg-black border border-zinc-800 rounded px-4 py-2 text-zinc-200 focus:outline-none focus:border-lime-500 transition-colors"
                  required
                >
                  <option value="EGO+ RS">EGO+ RS</option>
                  <option value="Eva Ribelle">Eva Ribelle</option>
                  <option value="EsseEsse9">EsseEsse9</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1">VIN *</label>
                <input
                  type="text"
                  value={newBike.vin}
                  onChange={(e) => setNewBike({ ...newBike, vin: e.target.value.toUpperCase() })}
                  className="w-full bg-black border border-zinc-800 rounded px-4 py-2 text-zinc-200 font-mono focus:outline-none focus:border-lime-500 transition-colors"
                  placeholder="ZENER1234567890AB"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1">Year *</label>
                <input
                  type="number"
                  value={newBike.year}
                  onChange={(e) => setNewBike({ ...newBike, year: parseInt(e.target.value) })}
                  className="w-full bg-black border border-zinc-800 rounded px-4 py-2 text-zinc-200 focus:outline-none focus:border-lime-500 transition-colors"
                  min="2014"
                  max={new Date().getFullYear() + 1}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1">Color</label>
                <input
                  type="text"
                  value={newBike.color}
                  onChange={(e) => setNewBike({ ...newBike, color: e.target.value })}
                  className="w-full bg-black border border-zinc-800 rounded px-4 py-2 text-zinc-200 focus:outline-none focus:border-lime-500 transition-colors"
                  placeholder="Lava Red"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1">Kilometers</label>
                <input
                  type="text"
                  value={newBike.kms}
                  onChange={(e) => setNewBike({ ...newBike, kms: e.target.value })}
                  className="w-full bg-black border border-zinc-800 rounded px-4 py-2 text-zinc-200 focus:outline-none focus:border-lime-500 transition-colors"
                  placeholder="5000"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1">Trim</label>
                <input
                  type="text"
                  value={newBike.trim}
                  onChange={(e) => setNewBike({ ...newBike, trim: e.target.value })}
                  className="w-full bg-black border border-zinc-800 rounded px-4 py-2 text-zinc-200 focus:outline-none focus:border-lime-500 transition-colors"
                  placeholder="Standard"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddBikeModal(false)}
                  className="flex-1 bg-zinc-800 text-zinc-200 font-semibold py-3 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-lime-500 text-black font-semibold py-3 rounded-lg hover:bg-lime-400 transition-colors"
                >
                  Add Bike
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;