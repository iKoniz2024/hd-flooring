'use client';

import { useState, useEffect, useCallback, useMemo, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Package,
  Layers,
  Plus,
  Pencil,
  Trash2,
  Upload,
  AlertCircle,
  CheckCircle2,
  X,
  Loader2,
  RefreshCw,
  Search,
  ArrowLeft,
  DollarSign,
  Tag,
  Lock,
  KeyRound,
  Mail,
  Eye,
  EyeOff,
  LogOut,
  ShieldCheck,
  Image as ImageIcon,
  FolderKanban,
  MapPin,
  Building2,
  Sparkles,
  Handshake,
  ExternalLink,
  Globe,
  Award
} from 'lucide-react';
import { invalidateApiCache, updateApiCache } from '@/lib/utils/apiCache';
import { compressImageFile, formatFileSize } from '@/lib/utils/imageCompression';

interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  categoryName?: string;
  price: number;
  image: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectItem {
  _id: string;
  title: string;
  category: string;
  propertyType: 'Residential' | 'Commercial';
  location: string;
  coverImage: string;
  challenge?: string;
  solution?: string;
  result?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PartnerItem {
  _id: string;
  name: string;
  type: 'manufacturer' | 'membership' | 'certification';
  logo: string;
  websiteUrl?: string;
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [authenticating, setAuthenticating] = useState(false);

  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'projects' | 'partners'>('products');

  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categorySearch, setCategorySearch] = useState('');

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Projects state
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectSearch, setProjectSearch] = useState('');
  const [selectedProjectCategoryFilter, setSelectedProjectCategoryFilter] = useState<string>('all');

  // Partners & Brands state
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [loadingPartners, setLoadingPartners] = useState(true);
  const [partnerSearch, setPartnerSearch] = useState('');
  const [selectedPartnerTypeFilter, setSelectedPartnerTypeFilter] = useState<'all' | 'manufacturer' | 'membership' | 'certification'>('all');

  // Feedback banner state
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Global Refreshing state
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Category Modal state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryModalMode, setCategoryModalMode] = useState<'add' | 'edit'>('add');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryNameInput, setCategoryNameInput] = useState('');
  const [categoryDescriptionInput, setCategoryDescriptionInput] = useState('');
  const [categoryImageFile, setCategoryImageFile] = useState<File | null>(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState<string>('');
  const [submittingCategory, setSubmittingCategory] = useState(false);

  // Product Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productModalMode, setProductModalMode] = useState<'add' | 'edit'>('add');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState('');
  const [productAdditionalFiles, setProductAdditionalFiles] = useState<File[]>([]);
  const [productAdditionalPreviews, setProductAdditionalPreviews] = useState<string[]>([]);
  const [submittingProduct, setSubmittingProduct] = useState(false);

  // Project Modal state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectModalMode, setProjectModalMode] = useState<'add' | 'edit'>('add');
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [projectPropertyType, setProjectPropertyType] = useState<'Residential' | 'Commercial'>('Residential');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectChallenge, setProjectChallenge] = useState('');
  const [projectSolution, setProjectSolution] = useState('');
  const [projectResult, setProjectResult] = useState('');
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);
  const [projectImagePreview, setProjectImagePreview] = useState('');
  const [projectAdditionalFiles, setProjectAdditionalFiles] = useState<File[]>([]);
  const [projectAdditionalPreviews, setProjectAdditionalPreviews] = useState<string[]>([]);
  const [submittingProject, setSubmittingProject] = useState(false);

  // Partner Modal state
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [partnerModalMode, setPartnerModalMode] = useState<'add' | 'edit'>('add');
  const [editingPartner, setEditingPartner] = useState<PartnerItem | null>(null);
  const [partnerNameInput, setPartnerNameInput] = useState('');
  const [partnerTypeInput, setPartnerTypeInput] = useState<'manufacturer' | 'membership' | 'certification'>('manufacturer');
  const [partnerLogoFile, setPartnerLogoFile] = useState<File | null>(null);
  const [partnerLogoPreview, setPartnerLogoPreview] = useState<string>('');
  const [partnerWebsiteInput, setPartnerWebsiteInput] = useState('');
  const [partnerOrderInput, setPartnerOrderInput] = useState<number>(0);
  const [partnerIsActiveInput, setPartnerIsActiveInput] = useState<boolean>(true);
  const [submittingPartner, setSubmittingPartner] = useState(false);

  // Delete confirmation modal state
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    type: 'product' | 'category' | 'project' | 'partner';
    id: string;
    title: string;
  }>({ isOpen: false, type: 'product', id: '', title: '' });
  const [deletingItem, setDeletingItem] = useState(false);

  // Show feedback notice
  const showFeedback = (message: string, type: 'success' | 'error') => {
    setFeedback({ message, type });
    setTimeout(() => {
      setFeedback(null);
    }, 5000);
  };

  // Fetch Categories without triggering loading skeleton if data already exists
  const fetchCategories = useCallback(async (silent = false) => {
    if (!silent) {
      setCategories((prev) => {
        if (prev.length === 0) setLoadingCategories(true);
        return prev;
      });
    }
    try {
      const res = await fetch(`/api/categories?all=true&_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
      });
      const data = await res.json();
      if (data.success) {
        setCategories(data.data || []);
        updateApiCache('/api/categories', data);
      } else if (!silent) {
        showFeedback(data.error || 'Failed to fetch categories', 'error');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      if (!silent) {
        showFeedback('Database connection or network error fetching categories', 'error');
      }
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  // Fetch Products without triggering loading skeleton if data already exists
  const fetchProducts = useCallback(async (silent = false) => {
    if (!silent) {
      setProducts((prev) => {
        if (prev.length === 0) setLoadingProducts(true);
        return prev;
      });
    }
    try {
      const res = await fetch(`/api/products?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
      });
      const data = await res.json();
      if (data.success) {
        setCategories((currentCats) => {
          const formatted = (data.data || []).map((prod: Product) => {
            if (!prod.categoryName || prod.categoryName === 'Uncategorized') {
              const matched = currentCats.find((c) => c._id === prod.category);
              if (matched) return { ...prod, categoryName: matched.name };
            }
            return prod;
          });
          setProducts(formatted);
          return currentCats;
        });
        updateApiCache('/api/products', data);
      } else if (!silent) {
        showFeedback(data.error || 'Failed to fetch products', 'error');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      if (!silent) {
        showFeedback('Database connection or network error fetching products', 'error');
      }
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // Fetch Projects without triggering loading skeleton if data already exists
  const fetchProjects = useCallback(async (silent = false) => {
    if (!silent) {
      setProjects((prev) => {
        if (prev.length === 0) setLoadingProjects(true);
        return prev;
      });
    }
    try {
      const res = await fetch(`/api/projects?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.data || []);
        updateApiCache('/api/projects', data);
      } else if (!silent) {
        showFeedback(data.error || 'Failed to fetch projects', 'error');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      if (!silent) {
        showFeedback('Database connection or network error fetching projects', 'error');
      }
    } finally {
      setLoadingProjects(false);
    }
  }, []);

  // Fetch Partners without triggering loading skeleton if data already exists
  const fetchPartners = useCallback(async (silent = false) => {
    if (!silent) {
      setPartners((prev) => {
        if (prev.length === 0) setLoadingPartners(true);
        return prev;
      });
    }
    try {
      const res = await fetch(`/api/partners?all=true&_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
      });
      const data = await res.json();
      if (data.success) {
        setPartners(data.data || []);
        updateApiCache('/api/partners', data);
      } else if (!silent) {
        showFeedback(data.error || 'Failed to fetch partners', 'error');
      }
    } catch (error) {
      console.error('Error fetching partners:', error);
      if (!silent) {
        showFeedback('Database connection or network error fetching partners', 'error');
      }
    } finally {
      setLoadingPartners(false);
    }
  }, []);

  // Refresh all data silently
  const handleRefreshAll = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([
      fetchCategories(true),
      fetchProducts(true),
      fetchProjects(true),
      fetchPartners(true),
    ]);
    setIsRefreshing(false);
  }, [fetchCategories, fetchProducts, fetchProjects, fetchPartners]);

  // Initial Auth Check
  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
      fetchCategories();
      fetchProducts();
      fetchProjects();
      fetchPartners();
    }
    setCheckingAuth(false);
  }, [fetchCategories, fetchProducts, fetchProjects, fetchPartners]);

  // Clean up ObjectURL preview memory leak
  useEffect(() => {
    return () => {
      if (productImagePreview && productImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(productImagePreview);
      }
      if (projectImagePreview && projectImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(projectImagePreview);
      }
      if (partnerLogoPreview && partnerLogoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(partnerLogoPreview);
      }
    };
  }, [productImagePreview, projectImagePreview, partnerLogoPreview]);

  // Login Submit Handler
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput.trim()) return;

    setAuthenticating(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.trim(), password: passwordInput }),
      });

      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('admin_authenticated', 'true');
        if (data.token) {
          sessionStorage.setItem('admin_token', data.token);
        }
        setIsAuthenticated(true);
        setPasswordInput('');
        fetchCategories();
        fetchProducts();
        fetchProjects();
        fetchPartners();
      } else {
        setLoginError(data.error || 'Incorrect email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred while authenticating.');
    } finally {
      setAuthenticating(false);
    }
  };

  // Logout Handler
  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_token');
    document.cookie = 'adminToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setIsAuthenticated(false);
  };

  // Handle Category Modal Open
  const openAddCategoryModal = () => {
    setCategoryModalMode('add');
    setEditingCategory(null);
    setCategoryNameInput('');
    setCategoryDescriptionInput('');
    setCategoryImageFile(null);
    setCategoryImagePreview('');
    setIsCategoryModalOpen(true);
  };

  const openEditCategoryModal = (cat: Category) => {
    setCategoryModalMode('edit');
    setEditingCategory(cat);
    setCategoryNameInput(cat.name);
    setCategoryDescriptionInput(cat.description || '');
    setCategoryImageFile(null);
    setCategoryImagePreview(cat.image || '');
    setIsCategoryModalOpen(true);
  };

  // Helper to upload any File, blob: URL, or base64 data: string, returning a clean server URL with automatic compression
  const uploadImageIfNeeded = async (
    fileOrUrl: File | string | null | undefined,
    preset: 'logo' | 'cover' | 'photo' = 'photo'
  ): Promise<string> => {
    if (!fileOrUrl) return '';

    const compressionOpts =
      preset === 'logo'
        ? { maxWidth: 600, maxHeight: 400, quality: 0.85, targetFormat: 'image/webp' as const }
        : preset === 'cover'
        ? { maxWidth: 1920, maxHeight: 1080, quality: 0.82, targetFormat: 'image/webp' as const }
        : { maxWidth: 1400, maxHeight: 1400, quality: 0.82, targetFormat: 'image/webp' as const };

    if (fileOrUrl instanceof File) {
      let finalFile: File = fileOrUrl;
      try {
        const compressed = await compressImageFile(fileOrUrl, compressionOpts);
        finalFile = compressed.file;
      } catch (err) {
        console.warn('Image compression fallback to original:', err);
      }

      const uploadFormData = new FormData();
      uploadFormData.append('file', finalFile);
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });
      const uploadData = await uploadRes.json();
      if (!uploadData.success) {
        throw new Error(uploadData.error || 'Failed to upload image file.');
      }
      return uploadData.url;
    }

    if (typeof fileOrUrl === 'string') {
      const trimmed = fileOrUrl.trim();
      if (!trimmed) return '';

      if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
        try {
          const resBlob = await fetch(trimmed);
          const blob = await resBlob.blob();
          const mimeType = blob.type || 'image/jpeg';
          const ext = mimeType.split('/')[1] || 'jpg';
          const fileObj = new File([blob], `upload-${Date.now()}.${ext}`, { type: mimeType });

          let finalFile: File = fileObj;
          try {
            const compressed = await compressImageFile(fileObj, compressionOpts);
            finalFile = compressed.file;
          } catch (err) {
            console.warn('Image compression fallback to original:', err);
          }

          const uploadFormData = new FormData();
          uploadFormData.append('file', finalFile);
          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: uploadFormData,
          });
          const uploadData = await uploadRes.json();
          if (!uploadData.success) {
            throw new Error(uploadData.error || 'Failed to upload image preview.');
          }
          return uploadData.url;
        } catch (err) {
          console.error('Blob upload error:', err);
          throw new Error('Failed to process image preview. Please re-select the image file.');
        }
      }

      return trimmed;
    }

    return '';
  };

  // Submit Category
  const handleCategorySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!categoryNameInput.trim()) {
      showFeedback('Category name cannot be empty.', 'error');
      return;
    }

    if (!categoryImageFile && !categoryImagePreview) {
      showFeedback('Category cover image is strictly required. Please upload an image.', 'error');
      return;
    }

    setSubmittingCategory(true);
    const isEdit = categoryModalMode === 'edit' && editingCategory;
    const previousCategories = [...categories];
    const previousProducts = [...products];

    try {
      const finalCategoryImageUrl = await uploadImageIfNeeded(categoryImageFile || categoryImagePreview, 'cover');

      if (!finalCategoryImageUrl) {
        showFeedback('Category cover image is strictly required. Please upload an image.', 'error');
        setSubmittingCategory(false);
        return;
      }

      const trimmedName = categoryNameInput.trim();
      const trimmedDesc = categoryDescriptionInput.trim();

      const url = isEdit ? `/api/categories/${editingCategory._id}` : '/api/categories';
      const method = isEdit ? 'PUT' : 'POST';

      // Instant optimistic local state update for instant UI feedback
      if (isEdit && editingCategory) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat._id === editingCategory._id
              ? { ...cat, name: trimmedName, description: trimmedDesc, image: finalCategoryImageUrl }
              : cat
          )
        );
        // Synchronize product category names in local state instantly!
        setProducts((prev) =>
          prev.map((p) => (p.category === editingCategory._id ? { ...p, categoryName: trimmedName } : p))
        );
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          description: trimmedDesc,
          image: finalCategoryImageUrl,
        }),
      });

      const data = await res.json();

      if (data.success) {
        showFeedback(data.message || (isEdit ? 'Category updated successfully.' : 'Category added successfully.'), 'success');
        setIsCategoryModalOpen(false);
        setCategoryNameInput('');
        setCategoryDescriptionInput('');
        setCategoryImageFile(null);
        setCategoryModalMode('add');
        setCategoryImagePreview('');

        if (!isEdit && data.data) {
          setCategories((prev) => {
            const exists = prev.some((c) => c._id === data.data._id);
            return exists ? prev : [data.data, ...prev];
          });
        } else if (isEdit && data.data) {
          setCategories((prev) =>
            prev.map((cat) => (cat._id === data.data._id ? { ...cat, ...data.data } : cat))
          );
        }

        invalidateApiCache('/api/categories');
        invalidateApiCache('/api/products');
        fetchCategories(true);
        fetchProducts(true);
      } else {
        // Rollback state on server failure
        setCategories(previousCategories);
        setProducts(previousProducts);
        showFeedback(data.error || 'Failed to save category', 'error');
      }
    } catch (error: any) {
      setCategories(previousCategories);
      setProducts(previousProducts);
      console.error('Category submit error:', error);
      showFeedback(error?.message || 'An error occurred while saving category', 'error');
    } finally {
      setSubmittingCategory(false);
    }
  };

  // Handle Product Modal Open
  const openAddProductModal = () => {
    setProductModalMode('add');
    setEditingProduct(null);
    setProductTitle('');
    setProductDescription('');
    setProductCategory(categories.length > 0 ? categories[0]._id : '');
    setProductPrice('');
    setProductImageFile(null);
    setProductImagePreview('');
    setProductAdditionalFiles([]);
    setProductAdditionalPreviews([]);
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod: Product) => {
    setProductModalMode('edit');
    setEditingProduct(prod);
    setProductTitle(prod.title);
    setProductDescription(prod.description);
    setProductCategory(prod.category);
    setProductPrice(String(prod.price));
    setProductImageFile(null);
    setProductImagePreview(prod.image);
    setProductAdditionalFiles([]);
    setProductAdditionalPreviews(Array.isArray(prod.images) ? prod.images : []);
    setIsProductModalOpen(true);
  };

  // Handle Main Image File Selection
  const handleImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showFeedback('Please select a valid image file (JPG, PNG, WEBP, etc.)', 'error');
        return;
      }
      try {
        const res = await compressImageFile(file, { maxWidth: 1400, maxHeight: 1400, quality: 0.82 });
        setProductImageFile(res.file);
        setProductImagePreview(URL.createObjectURL(res.file));
        if (res.savingsPercent > 0) {
          showFeedback(`⚡ Image optimized: ${formatFileSize(res.originalSize)} ➔ ${formatFileSize(res.compressedSize)} (${res.savingsPercent}% saved)`, 'success');
        }
      } catch {
        setProductImageFile(file);
        setProductImagePreview(URL.createObjectURL(file));
      }
    }
  };

  // Handle Additional Images File Selection
  const handleAdditionalImagesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        try {
          const res = await compressImageFile(file, { maxWidth: 1200, maxHeight: 1200, quality: 0.80 });
          validFiles.push(res.file);
          validPreviews.push(URL.createObjectURL(res.file));
        } catch {
          validFiles.push(file);
          validPreviews.push(URL.createObjectURL(file));
        }
      }
    }

    setProductAdditionalFiles((prev) => [...prev, ...validFiles]);
    setProductAdditionalPreviews((prev) => [...prev, ...validPreviews]);
  };

  // Remove individual additional image
  const removeAdditionalImage = (indexToRemove: number) => {
    setProductAdditionalPreviews((prevPreviews) =>
      prevPreviews.filter((_, idx) => idx !== indexToRemove)
    );
    // Find if this preview maps to a new file or existing url
    let fileCounter = 0;
    setProductAdditionalFiles((prevFiles) => {
      return prevFiles.filter((_, idx) => {
        // match index against previews that are blob urls
        const match = idx !== indexToRemove;
        return match;
      });
    });
  };

  // Submit Product
  const handleProductSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!productTitle.trim()) {
      showFeedback('Product title cannot be empty.', 'error');
      return;
    }

    if (!productDescription.trim()) {
      showFeedback('Product description cannot be empty.', 'error');
      return;
    }

    if (!productCategory) {
      showFeedback('Please select a category.', 'error');
      return;
    }

    const priceNum = Number(productPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      showFeedback('Price must be a positive number greater than 0.', 'error');
      return;
    }

    if (productModalMode === 'add' && !productImageFile && !productImagePreview) {
      showFeedback('Product main image is required.', 'error');
      return;
    }

    setSubmittingProduct(true);

    try {
      const mainImageUrlPromise = uploadImageIfNeeded(productImageFile || productImagePreview, 'photo');
      const additionalImagesPromises = productAdditionalPreviews.map((prevStr, idx) => {
        const fileObj = productAdditionalFiles[idx];
        return uploadImageIfNeeded(fileObj || prevStr, 'photo');
      });

      const [finalMainImageUrl, rawAdditionalImages] = await Promise.all([
        mainImageUrlPromise,
        Promise.all(additionalImagesPromises),
      ]);

      const finalAdditionalImages = rawAdditionalImages.filter((u): u is string => Boolean(u));

      const isEdit = productModalMode === 'edit' && editingProduct;
      const url = isEdit ? `/api/products/${editingProduct._id}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';

      const selectedCatDoc = categories.find((c) => c._id === productCategory);
      const categoryName = selectedCatDoc ? selectedCatDoc.name : 'Uncategorized';

      const payload = {
        title: productTitle.trim(),
        description: productDescription.trim(),
        category: productCategory,
        price: priceNum,
        image: finalMainImageUrl,
        images: finalAdditionalImages,
      };

      const previousProducts = [...products];

      // Instant optimistic local state update for edit
      if (isEdit && editingProduct) {
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProduct._id ? { ...p, ...payload, categoryName } : p))
        );
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        showFeedback(data.message || (isEdit ? 'Product updated successfully.' : 'Product added successfully.'), 'success');
        setIsProductModalOpen(false);

        if (!isEdit && data.data) {
          const newProduct: Product = {
            ...data.data,
            categoryName,
          };
          setProducts((prev) => {
            const exists = prev.some((p) => p._id === newProduct._id);
            return exists ? prev : [newProduct, ...prev];
          });
        } else if (isEdit && data.data) {
          setProducts((prev) =>
            prev.map((p) => (p._id === data.data._id ? { ...p, ...data.data, categoryName } : p))
          );
        }

        invalidateApiCache('/api/products');
        fetchProducts(true);
      } else {
        setProducts(previousProducts);
        showFeedback(data.error || 'Failed to save product.', 'error');
      }
    } catch (error: any) {
      console.error('Product submit error:', error);
      showFeedback(error?.message || 'An error occurred while saving product.', 'error');
    } finally {
      setSubmittingProduct(false);
    }
  };

  // Handle Project Modal Open
  const openAddProjectModal = () => {
    setProjectModalMode('add');
    setEditingProject(null);
    setProjectTitle('');
    setProjectCategory(categories.length > 0 ? categories[0].name : '');
    setProjectPropertyType('Residential');
    setProjectLocation('');
    setProjectChallenge('');
    setProjectSolution('');
    setProjectResult('');
    setProjectImageFile(null);
    setProjectImagePreview('');
    setProjectAdditionalFiles([]);
    setProjectAdditionalPreviews([]);
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: ProjectItem) => {
    setProjectModalMode('edit');
    setEditingProject(proj);
    setProjectTitle(proj.title);
    setProjectCategory(proj.category || (categories.length > 0 ? categories[0].name : ''));
    setProjectPropertyType(proj.propertyType || 'Residential');
    setProjectLocation(proj.location || '');
    setProjectChallenge(proj.challenge || '');
    setProjectSolution(proj.solution || '');
    setProjectResult(proj.result || '');
    setProjectImageFile(null);
    setProjectImagePreview(proj.coverImage);
    setProjectAdditionalFiles([]);
    setProjectAdditionalPreviews((proj as any).galleryImages || []);
    setIsProjectModalOpen(true);
  };

  // Handle Project Main Image File Selection
  const handleProjectImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showFeedback('Please select a valid image file (JPG, PNG, WEBP, etc.)', 'error');
        return;
      }
      try {
        const res = await compressImageFile(file, { maxWidth: 1920, maxHeight: 1080, quality: 0.82 });
        setProjectImageFile(res.file);
        setProjectImagePreview(URL.createObjectURL(res.file));
        if (res.savingsPercent > 0) {
          showFeedback(`⚡ Cover optimized: ${formatFileSize(res.originalSize)} ➔ ${formatFileSize(res.compressedSize)} (${res.savingsPercent}% saved)`, 'success');
        }
      } catch {
        setProjectImageFile(file);
        setProjectImagePreview(URL.createObjectURL(file));
      }
    }
  };

  // Handle Project Additional Images File Selection
  const handleProjectAdditionalImagesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        try {
          const res = await compressImageFile(file, { maxWidth: 1400, maxHeight: 1000, quality: 0.80 });
          validFiles.push(res.file);
          validPreviews.push(URL.createObjectURL(res.file));
        } catch {
          validFiles.push(file);
          validPreviews.push(URL.createObjectURL(file));
        }
      }
    }

    setProjectAdditionalFiles((prev) => [...prev, ...validFiles]);
    setProjectAdditionalPreviews((prev) => [...prev, ...validPreviews]);
  };

  const removeProjectAdditionalImage = (indexToRemove: number) => {
    setProjectAdditionalPreviews((prevPreviews) =>
      prevPreviews.filter((_, idx) => idx !== indexToRemove)
    );
    setProjectAdditionalFiles((prevFiles) => {
      return prevFiles.filter((_, idx) => idx !== indexToRemove);
    });
  };

  // Submit Project
  const handleProjectSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!projectTitle.trim()) {
      showFeedback('Project title cannot be empty.', 'error');
      return;
    }

    if (!projectLocation.trim()) {
      showFeedback('Project location is required.', 'error');
      return;
    }

    if (projectModalMode === 'add' && !projectImageFile && !projectImagePreview) {
      showFeedback('Project cover image is required.', 'error');
      return;
    }

    setSubmittingProject(true);
    const previousProjects = [...projects];

    try {
      const coverImageUrlPromise = uploadImageIfNeeded(projectImageFile || projectImagePreview, 'cover');
      const additionalImagesPromises = projectAdditionalPreviews.map((prevStr, idx) => {
        const fileObj = projectAdditionalFiles[idx];
        return uploadImageIfNeeded(fileObj || prevStr, 'photo');
      });

      const [finalImageUrl, rawAdditionalImages] = await Promise.all([
        coverImageUrlPromise,
        Promise.all(additionalImagesPromises),
      ]);

      const finalAdditionalImageUrls = rawAdditionalImages.filter((u): u is string => Boolean(u));

      const allGalleryImages = Array.from(
        new Set([finalImageUrl, ...finalAdditionalImageUrls].filter(Boolean))
      );

      const isEdit = projectModalMode === 'edit' && editingProject;
      const url = isEdit ? `/api/projects/${editingProject._id}` : '/api/projects';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        title: projectTitle.trim(),
        category: projectCategory.trim() || 'Flooring Project',
        propertyType: projectPropertyType,
        location: projectLocation.trim(),
        coverImage: finalImageUrl,
        galleryImages: allGalleryImages,
        challenge: projectChallenge.trim(),
        solution: projectSolution.trim(),
        result: projectResult.trim(),
      };

      if (isEdit && editingProject) {
        setProjects((prev) =>
          prev.map((proj) => (proj._id === editingProject._id ? { ...proj, ...payload } : proj))
        );
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        showFeedback(
          data.message || (isEdit ? 'Project updated successfully.' : 'Project added successfully.'),
          'success'
        );
        setIsProjectModalOpen(false);

        if (!isEdit && data.data) {
          setProjects((prev) => {
            const exists = prev.some((p) => p._id === data.data._id);
            return exists ? prev : [data.data, ...prev];
          });
        } else if (isEdit && data.data) {
          setProjects((prev) =>
            prev.map((proj) => (proj._id === data.data._id ? { ...proj, ...data.data } : proj))
          );
        }

        invalidateApiCache('/api/projects');
        fetchProjects(true);
      } else {
        setProjects(previousProjects);
        showFeedback(data.error || 'Failed to save project.', 'error');
      }
    } catch (error: any) {
      setProjects(previousProjects);
      console.error('Project submit error:', error);
      showFeedback(error?.message || 'An error occurred while saving project.', 'error');
    } finally {
      setSubmittingProject(false);
    }
  };

  // Handle Partner Modal Open
  const openAddPartnerModal = () => {
    setPartnerModalMode('add');
    setEditingPartner(null);
    setPartnerNameInput('');
    setPartnerTypeInput('manufacturer');
    setPartnerLogoFile(null);
    setPartnerLogoPreview('');
    setPartnerWebsiteInput('');
    setPartnerOrderInput(partners.length + 1);
    setPartnerIsActiveInput(true);
    setIsPartnerModalOpen(true);
  };

  const openEditPartnerModal = (partner: PartnerItem) => {
    setPartnerModalMode('edit');
    setEditingPartner(partner);
    setPartnerNameInput(partner.name);
    setPartnerTypeInput(partner.type || 'manufacturer');
    setPartnerLogoFile(null);
    setPartnerLogoPreview(partner.logo || '');
    setPartnerWebsiteInput(partner.websiteUrl || '');
    setPartnerOrderInput(partner.order ?? 0);
    setPartnerIsActiveInput(partner.isActive !== false);
    setIsPartnerModalOpen(true);
  };

  // Submit Partner
  const handlePartnerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!partnerNameInput.trim()) {
      showFeedback('Partner / brand name is required.', 'error');
      return;
    }

    if (!partnerLogoFile && !partnerLogoPreview) {
      showFeedback('Partner logo image is required. Please upload a logo.', 'error');
      return;
    }

    setSubmittingPartner(true);
    const isEdit = partnerModalMode === 'edit' && editingPartner;
    const previousPartners = [...partners];

    try {
      const finalLogoUrl = await uploadImageIfNeeded(partnerLogoFile || partnerLogoPreview, 'logo');

      if (!finalLogoUrl) {
        showFeedback('Logo image upload failed. Please try again.', 'error');
        setSubmittingPartner(false);
        return;
      }

      const trimmedName = partnerNameInput.trim();
      const trimmedWebsite = partnerWebsiteInput.trim();
      const numericOrder = Number(partnerOrderInput) || 0;

      const url = isEdit ? `/api/partners/${editingPartner._id}` : '/api/partners';
      const method = isEdit ? 'PUT' : 'POST';

      // Instant optimistic UI update
      if (isEdit && editingPartner) {
        setPartners((prev) =>
          prev.map((p) =>
            p._id === editingPartner._id
              ? {
                  ...p,
                  name: trimmedName,
                  type: partnerTypeInput,
                  logo: finalLogoUrl,
                  websiteUrl: trimmedWebsite,
                  order: numericOrder,
                  isActive: partnerIsActiveInput,
                }
              : p
          )
        );
      }

      const token = sessionStorage.getItem('admin_token') || '';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: trimmedName,
          type: partnerTypeInput,
          logo: finalLogoUrl,
          websiteUrl: trimmedWebsite || undefined,
          order: numericOrder,
          isActive: partnerIsActiveInput,
        }),
      });

      const data = await res.json();

      if (data.success) {
        showFeedback(
          data.message || (isEdit ? 'Partner updated successfully.' : 'Partner added successfully.'),
          'success'
        );
        setIsPartnerModalOpen(false);
        setPartnerNameInput('');
        setPartnerLogoFile(null);
        setPartnerLogoPreview('');
        setPartnerWebsiteInput('');
        setPartnerOrderInput(0);

        if (!isEdit && data.data) {
          setPartners((prev) => [data.data, ...prev]);
        } else if (isEdit && data.data) {
          setPartners((prev) =>
            prev.map((p) => (p._id === data.data._id ? { ...p, ...data.data } : p))
          );
        }

        invalidateApiCache('/api/partners');
        fetchPartners(true);
      } else {
        setPartners(previousPartners);
        showFeedback(data.error || 'Failed to save partner', 'error');
      }
    } catch (error: any) {
      setPartners(previousPartners);
      console.error('Partner submit error:', error);
      showFeedback(error?.message || 'An error occurred while saving partner', 'error');
    } finally {
      setSubmittingPartner(false);
    }
  };

  // Quick Toggle Partner Active
  const handleTogglePartnerActive = async (partner: PartnerItem) => {
    const previousPartners = [...partners];
    const newStatus = !partner.isActive;

    // Optimistic UI update
    setPartners((prev) =>
      prev.map((p) => (p._id === partner._id ? { ...p, isActive: newStatus } : p))
    );

    try {
      const token = sessionStorage.getItem('admin_token') || '';
      const res = await fetch(`/api/partners/${partner._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ isActive: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        invalidateApiCache('/api/partners');
        showFeedback(`${partner.name} visibility updated.`, 'success');
      } else {
        setPartners(previousPartners);
        showFeedback(data.error || 'Failed to update partner visibility', 'error');
      }
    } catch (err) {
      setPartners(previousPartners);
      showFeedback('Failed to update partner visibility', 'error');
    }
  };

  // Quick Update Partner Order
  const handlePartnerOrderChange = async (partnerId: string, newOrder: number) => {
    setPartners((prev) =>
      prev.map((p) => (p._id === partnerId ? { ...p, order: newOrder } : p))
    );

    try {
      const token = sessionStorage.getItem('admin_token') || '';
      await fetch(`/api/partners/${partnerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ order: newOrder }),
      });
      invalidateApiCache('/api/partners');
    } catch {
      // Background update
    }
  };

  // Handle Delete Confirmation
  const confirmDelete = async () => {
    if (!deleteModalState.id) return;
    setDeletingItem(true);

    const deleteId = deleteModalState.id;
    const deleteType = deleteModalState.type;

    const previousCategories = [...categories];
    const previousProducts = [...products];
    const previousProjects = [...projects];
    const previousPartners = [...partners];

    try {
      const endpoint = deleteType === 'category'
        ? `/api/categories/${deleteId}`
        : deleteType === 'project'
        ? `/api/projects/${deleteId}`
        : deleteType === 'partner'
        ? `/api/partners/${deleteId}`
        : `/api/products/${deleteId}`;

      // Optimistic UI update: Remove item instantly from UI
      if (deleteType === 'category') {
        setCategories((prev) => prev.filter((c) => c._id !== deleteId));
        if (selectedCategoryFilter === deleteId) {
          setSelectedCategoryFilter('all');
        }
      } else if (deleteType === 'project') {
        setProjects((prev) => prev.filter((p) => p._id !== deleteId));
      } else if (deleteType === 'partner') {
        setPartners((prev) => prev.filter((p) => p._id !== deleteId));
      } else {
        setProducts((prev) => prev.filter((p) => p._id !== deleteId));
      }

      setDeleteModalState({ isOpen: false, type: 'product', id: '', title: '' });

      const token = sessionStorage.getItem('admin_token') || '';
      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();

      if (data.success) {
        showFeedback(
          data.message || `${deleteType.charAt(0).toUpperCase() + deleteType.slice(1)} deleted successfully.`,
          'success'
        );
        if (deleteType === 'category') {
          invalidateApiCache('/api/categories');
          invalidateApiCache('/api/products');
          fetchCategories(true);
          fetchProducts(true);
        } else if (deleteType === 'project') {
          invalidateApiCache('/api/projects');
          fetchProjects(true);
        } else if (deleteType === 'partner') {
          invalidateApiCache('/api/partners');
          fetchPartners(true);
        } else {
          invalidateApiCache('/api/products');
          fetchProducts(true);
        }
      } else {
        // Rollback on server failure
        if (deleteType === 'category') {
          setCategories(previousCategories);
        } else if (deleteType === 'project') {
          setProjects(previousProjects);
        } else if (deleteType === 'partner') {
          setPartners(previousPartners);
        } else {
          setProducts(previousProducts);
        }
        showFeedback(data.error || 'Failed to delete item.', 'error');
      }
    } catch (error) {
      if (deleteType === 'category') setCategories(previousCategories);
      else if (deleteType === 'project') setProjects(previousProjects);
      else if (deleteType === 'partner') setPartners(previousPartners);
      else setProducts(previousProducts);
      console.error('Delete error:', error);
      showFeedback('An error occurred while deleting item.', 'error');
    } finally {
      setDeletingItem(false);
    }
  };

  // Filtered lists for UI search
  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredPartners = useMemo(() => {
    return partners
      .filter((p) => {
        const matchesType =
          selectedPartnerTypeFilter === 'all' || p.type === selectedPartnerTypeFilter;
        const q = partnerSearch.toLowerCase().trim();
        const matchesSearch = !q || p.name.toLowerCase().includes(q);
        return matchesType && matchesSearch;
      })
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [partners, selectedPartnerTypeFilter, partnerSearch]);

  const manufacturerCount = useMemo(
    () => partners.filter((p) => p.type === 'manufacturer').length,
    [partners]
  );
  const membershipCount = useMemo(
    () => partners.filter((p) => p.type === 'membership').length,
    [partners]
  );
  const certificationCount = useMemo(
    () => partners.filter((p) => p.type === 'certification').length,
    [partners]
  );

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(productSearch.toLowerCase());

    const matchesCategory =
      selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Render Loading screen during Auth check
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#E85D04] animate-spin" />
        <p className="text-xs font-semibold text-stone-500">Checking credentials...</p>
      </div>
    );
  }

  // Render Password Verification Screen if not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight font-outfit text-stone-900 dark:text-white">
              HD Flooring Admin Portal
            </h2>
            <p className="text-xs text-stone-500">
              Enter the admin access password to manage products & categories.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  required
                  autoComplete="username"
                  placeholder="Enter admin email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                Admin Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="Enter admin password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1"
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={authenticating}
              className="w-full py-3 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {authenticating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Unlock Admin Panel</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-[#E85D04] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Main Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="p-2 rounded-xl bg-stone-200/60 dark:bg-stone-800/60 hover:bg-[#E85D04] hover:text-white transition-all"
                title="Back to Website Home"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-outfit text-stone-900 dark:text-white flex items-center gap-2">
                  <span>Admin Dashboard</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                    Secured
                  </span>
                </h1>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Manage products, categories, images & inventory database
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefreshAll}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-200/80 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#E85D04]' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white text-xs font-semibold transition-all border border-rose-500/20"
              title="Lock Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Sweet Floating Toast Notification Overlay (Fixed overlay, Zero Layout Shift) */}
        {feedback && (
          <div className="fixed bottom-6 right-6 z-50 max-w-sm sm:max-w-md w-full px-4 pointer-events-none transition-all">
            <div
              className={`pointer-events-auto p-4 rounded-2xl flex items-center justify-between gap-4 border shadow-2xl backdrop-blur-xl transition-all animate-bounce-short ${
                feedback.type === 'success'
                  ? 'bg-stone-900/95 text-white border-emerald-500/40 dark:bg-stone-900/95'
                  : 'bg-stone-900/95 text-white border-rose-500/40 dark:bg-stone-900/95'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-rose-500/20 text-rose-400'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                </div>
                <span className="text-xs sm:text-sm font-bold tracking-tight text-stone-100">
                  {feedback.message}
                </span>
              </div>
              <button
                onClick={() => setFeedback(null)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-stone-400 hover:text-white transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Main Section Navigation Tabs */}
        <div className="flex items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-sm border-b-2 transition-all ${
                activeTab === 'products'
                  ? 'border-[#E85D04] text-[#E85D04]'
                  : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products</span>
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-stone-200 dark:bg-stone-800 font-semibold text-stone-700 dark:text-stone-300">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-sm border-b-2 transition-all ${
                activeTab === 'categories'
                  ? 'border-[#E85D04] text-[#E85D04]'
                  : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Categories</span>
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-stone-200 dark:bg-stone-800 font-semibold text-stone-700 dark:text-stone-300">
                {categories.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-sm border-b-2 transition-all ${
                activeTab === 'projects'
                  ? 'border-[#E85D04] text-[#E85D04]'
                  : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Project Gallery</span>
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-stone-200 dark:bg-stone-800 font-semibold text-stone-700 dark:text-stone-300">
                {projects.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('partners')}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-sm border-b-2 transition-all cursor-pointer ${
                activeTab === 'partners'
                  ? 'border-[#E85D04] text-[#E85D04]'
                  : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Handshake className="w-4 h-4" />
              <span>Partners & Brands</span>
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-stone-200 dark:bg-stone-800 font-semibold text-stone-700 dark:text-stone-300">
                {partners.length}
              </span>
            </button>
          </div>

          <div>
            {activeTab === 'products' ? (
              <button
                onClick={openAddProductModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            ) : activeTab === 'categories' ? (
              <button
                onClick={openAddCategoryModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            ) : activeTab === 'projects' ? (
              <button
                onClick={openAddProjectModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            ) : (
              <button
                onClick={openAddPartnerModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Partner / Brand</span>
              </button>
            )}
          </div>
        </div>

        {/* PRODUCTS TAB CONTENT */}
        {activeTab === 'products' && (
          <div className="space-y-6 min-h-[480px]">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search products by title..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] transition-all"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 shrink-0">
                  Category:
                </label>
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] transition-all"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products List Table / Grid */}
            {loadingProducts ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-[#E85D04] animate-spin" />
                <p className="text-sm text-stone-500">Loading products from database...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-100 dark:bg-stone-800 flex items-center justify-center text-[#E85D04]">
                  <Package className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">No Products Found</h3>
                  <p className="text-sm text-stone-500 max-w-md mx-auto mt-1">
                    {productSearch || selectedCategoryFilter !== 'all'
                      ? 'No products match your search or category filter.'
                      : 'Get started by creating your first product using the Add Product button.'}
                  </p>
                </div>
                {categories.length === 0 && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl inline-block border border-amber-200 dark:border-amber-800">
                    ⚠️ Note: You need to add at least one Category before creating products.
                  </p>
                )}
                <div>
                  <button
                    onClick={openAddProductModal}
                    className="px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white font-bold text-xs uppercase tracking-wider shadow-md"
                  >
                    + Add Product Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-stone-400">
                          <ImageIcon className="w-10 h-10" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-stone-900/80 text-white backdrop-blur-md">
                          {product.categoryName || 'Uncategorized'}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-[#E85D04] text-white shadow-md">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-base font-bold text-stone-900 dark:text-white line-clamp-1">
                          {product.title}
                        </h3>
                        <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 line-clamp-3 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-stone-400">
                          ID: {product._id.substring(product._id.length - 6)}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditProductModal(product)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-[#E85D04] hover:text-white text-stone-700 dark:text-stone-300 text-xs font-semibold transition-all"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() =>
                              setDeleteModalState({
                                isOpen: true,
                                type: 'product',
                                id: product._id,
                                title: product.title,
                              })
                            }
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-600 hover:text-white text-rose-600 dark:text-rose-400 text-xs font-semibold transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CATEGORIES TAB CONTENT */}
        {activeTab === 'categories' && (
          <div className="space-y-6 min-h-[480px]">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search category name..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] transition-all"
                />
              </div>
            </div>

            {/* Categories List */}
            {loadingCategories ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-[#E85D04] animate-spin" />
                <p className="text-sm text-stone-500">Loading categories from database...</p>
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-100 dark:bg-stone-800 flex items-center justify-center text-[#E85D04]">
                  <Layers className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">No Categories Found</h3>
                  <p className="text-sm text-stone-500 max-w-md mx-auto mt-1">
                    {categorySearch
                      ? 'No categories match your search term.'
                      : 'Create categories to organize your flooring products.'}
                  </p>
                </div>
                <div>
                  <button
                    onClick={openAddCategoryModal}
                    className="px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white font-bold text-xs uppercase tracking-wider shadow-md"
                  >
                    + Add Category Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-100/70 dark:bg-stone-800/70 border-b border-stone-200 dark:border-stone-800 text-xs uppercase font-extrabold text-stone-600 dark:text-stone-400">
                        <th className="py-3.5 px-6">Category Name</th>
                        <th className="py-3.5 px-6">Total Products</th>
                        <th className="py-3.5 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
                      {filteredCategories.map((category) => {
                        const count = products.filter((p) => p.category === category._id).length;

                        return (
                          <tr
                            key={category._id}
                            className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors"
                          >
                            <td className="py-4 px-6 font-bold text-stone-900 dark:text-stone-100 flex items-center gap-3">
                              {category.image ? (
                                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 shrink-0 bg-stone-100 dark:bg-stone-800">
                                  <Image src={category.image} alt={category.name} fill sizes="40px" className="object-cover" />
                                </div>
                              ) : (
                                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-stone-800 text-[#E85D04] flex items-center justify-center shrink-0">
                                  <Layers className="w-5 h-5" />
                                </div>
                              )}
                              <span>{category.name}</span>
                            </td>

                            <td className="py-4 px-6 text-stone-600 dark:text-stone-400 font-medium">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-xs font-bold text-stone-800 dark:text-stone-200">
                                <Package className="w-3 h-3 text-[#E85D04]" />
                                {count} {count === 1 ? 'Product' : 'Products'}
                              </span>
                            </td>

                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openEditCategoryModal(category)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-[#E85D04] hover:text-white text-stone-700 dark:text-stone-300 text-xs font-semibold transition-all"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                  <span>Edit</span>
                                </button>

                                <button
                                  onClick={() =>
                                    setDeleteModalState({
                                      isOpen: true,
                                      type: 'category',
                                      id: category._id,
                                      title: category.name,
                                    })
                                  }
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-600 hover:text-white text-rose-600 dark:text-rose-400 text-xs font-semibold transition-all"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROJECTS TAB CONTENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6 min-h-[480px]">
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search projects by title..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] transition-all"
                />
              </div>
            </div>

            {/* Projects Grid */}
            {loadingProjects ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-[#E85D04] animate-spin" />
                <p className="text-sm text-stone-500">Loading project gallery from database...</p>
              </div>
            ) : projects.filter((p) =>
                p.title.toLowerCase().includes(projectSearch.toLowerCase())
              ).length === 0 ? (
              <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-100 dark:bg-stone-800 flex items-center justify-center text-[#E85D04]">
                  <FolderKanban className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">No Projects Found</h3>
                  <p className="text-sm text-stone-500 max-w-md mx-auto mt-1">
                    {projectSearch
                      ? 'No projects match your search term.'
                      : 'Add completed flooring showcase projects to populate your website gallery.'}
                  </p>
                </div>
                <div>
                  <button
                    onClick={openAddProjectModal}
                    className="px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white font-bold text-xs uppercase tracking-wider shadow-md"
                  >
                    + Add Project Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((p) =>
                    p.title.toLowerCase().includes(projectSearch.toLowerCase())
                  )
                  .map((project) => (
                    <div
                      key={project._id}
                      className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                    >
                      {/* Image Container */}
                      <div className="relative h-48 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                        {project.coverImage ? (
                          <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-stone-400">
                            <ImageIcon className="w-10 h-10" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-stone-900/80 text-white backdrop-blur-md">
                            {project.category}
                          </span>
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#E85D04]/90 text-white backdrop-blur-md">
                            {project.propertyType}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#E85D04] mb-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{project.location}</span>
                          </div>
                          <h3 className="text-base font-bold text-stone-900 dark:text-white line-clamp-2">
                            {project.title}
                          </h3>
                        </div>

                        {/* Card Actions */}
                        <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-stone-400">
                            ID: {project._id.substring(project._id.length - 6)}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditProjectModal(project)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-[#E85D04] hover:text-white text-stone-700 dark:text-stone-300 text-xs font-semibold transition-all"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() =>
                                setDeleteModalState({
                                  isOpen: true,
                                  type: 'project',
                                  id: project._id,
                                  title: project.title,
                                })
                              }
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-600 hover:text-white text-rose-600 dark:text-rose-400 text-xs font-semibold transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* PARTNERS & BRANDS TAB CONTENT */}
        {activeTab === 'partners' && (
          <div className="space-y-6 min-h-[480px]">
            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search partners & brands by name..."
                  value={partnerSearch}
                  onChange={(e) => setPartnerSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] transition-all"
                />
              </div>

              {/* Type Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <button
                  type="button"
                  onClick={() => setSelectedPartnerTypeFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedPartnerTypeFilter === 'all'
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  All ({partners.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPartnerTypeFilter('manufacturer')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedPartnerTypeFilter === 'manufacturer'
                      ? 'bg-[#E85D04] text-white shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  Manufacturers ({manufacturerCount})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPartnerTypeFilter('membership')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedPartnerTypeFilter === 'membership'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  Memberships ({membershipCount})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPartnerTypeFilter('certification')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedPartnerTypeFilter === 'certification'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  Certifications ({certificationCount})
                </button>
              </div>
            </div>

            {/* Partners Grid */}
            {loadingPartners ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-[#E85D04] animate-spin" />
                <p className="text-sm text-stone-500">Loading partners & brands from database...</p>
              </div>
            ) : filteredPartners.length === 0 ? (
              <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-100 dark:bg-stone-800 flex items-center justify-center text-[#E85D04]">
                  <Handshake className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">No Partners or Brands Found</h3>
                  <p className="text-sm text-stone-500 max-w-md mx-auto mt-1">
                    {partnerSearch
                      ? 'No partners match your search criteria.'
                      : 'Add your manufacturer brands, certifications, and industry memberships to showcase trust.'}
                  </p>
                </div>
                <div>
                  <button
                    onClick={openAddPartnerModal}
                    className="px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
                  >
                    + Add Partner / Brand Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredPartners.map((partner: PartnerItem) => (
                  <div
                    key={partner._id}
                    className={`bg-white dark:bg-stone-900 border rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                      partner.isActive
                        ? 'border-stone-200 dark:border-stone-800'
                        : 'border-stone-200/50 dark:border-stone-800/50 opacity-75'
                    }`}
                  >
                    {/* Top: Logo Display Area */}
                    <div className="relative h-36 w-full bg-stone-50 dark:bg-stone-950/60 p-4 flex items-center justify-center border-b border-stone-100 dark:border-stone-800">
                      {partner.logo ? (
                        <div className="relative w-full h-full max-h-24">
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 250px"
                            className="object-contain filter transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="text-stone-300 dark:text-stone-700 flex flex-col items-center">
                          <ImageIcon className="w-8 h-8" />
                          <span className="text-[10px] mt-1">No Logo</span>
                        </div>
                      )}

                      {/* Type Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            partner.type === 'membership'
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                              : partner.type === 'certification'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                          }`}
                        >
                          {partner.type}
                        </span>
                      </div>

                      {/* Active Status Quick Toggle */}
                      <button
                        type="button"
                        onClick={() => handleTogglePartnerActive(partner)}
                        title={partner.isActive ? 'Active (Click to disable)' : 'Inactive (Click to activate)'}
                        className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                          partner.isActive
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-rose-500/15 hover:text-rose-600'
                            : 'bg-stone-200 dark:bg-stone-800 text-stone-500 border border-stone-300 dark:border-stone-700 hover:bg-emerald-500/15 hover:text-emerald-600'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            partner.isActive ? 'bg-emerald-500' : 'bg-stone-400'
                          }`}
                        />
                        <span>{partner.isActive ? 'Active' : 'Inactive'}</span>
                      </button>
                    </div>

                    {/* Middle: Content Info */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-bold text-sm text-stone-900 dark:text-white line-clamp-1">
                          {partner.name}
                        </h4>
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
                          <Globe className="w-3.5 h-3.5 shrink-0 text-stone-400" />
                          {partner.websiteUrl ? (
                            <a
                              href={partner.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#E85D04] hover:underline flex items-center gap-1 truncate text-xs"
                            >
                              <span className="truncate">{partner.websiteUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          ) : (
                            <span className="text-stone-400 italic text-[11px]">No website URL</span>
                          )}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-medium text-stone-400 capitalize">
                          {partner.type}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          ID: {partner._id.substring(partner._id.length - 4)}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditPartnerModal(partner)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-[#E85D04] hover:text-white text-stone-700 dark:text-stone-300 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteModalState({
                              isOpen: true,
                              type: 'partner',
                              id: partner._id,
                              title: partner.name,
                            })
                          }
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-600 hover:text-white text-rose-600 dark:text-rose-400 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CATEGORY ADD/EDIT MODAL */}
        {isCategoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    {categoryModalMode === 'edit' ? 'Edit Category' : 'Add New Category'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCategorySubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                    Category Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Tag className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hardwood Flooring, Vinyl Planks"
                      value={categoryNameInput}
                      onChange={(e) => setCategoryNameInput(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1.5">
                    Category name must be unique.
                  </p>
                </div>

                {/* Category Short Description */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                    Category Short Description (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief tagline or description to display on Hero banner & services (e.g. Solid & Engineered hardwood flooring installation)"
                    value={categoryDescriptionInput}
                    onChange={(e) => setCategoryDescriptionInput(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all resize-none"
                  />
                </div>

                {/* Category Banner Image Upload */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                    Category Cover & Hero Banner Image <span className="text-rose-500">*</span>
                  </label>
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#E85D04] dark:hover:border-[#E85D04] rounded-2xl cursor-pointer bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all text-center">
                    <Upload className="w-5 h-5 text-[#E85D04] mb-1" />
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                      Click to upload Category Cover Image
                    </span>
                    <span className="text-[11px] font-bold text-[#E85D04] dark:text-[#E85D04] bg-[#E85D04]/10 px-2.5 py-1 rounded-lg mt-1.5 border border-[#E85D04]/20">
                      📐 Recommended: 1920 × 1080 px (16:9 Widescreen)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (!file.type.startsWith('image/')) {
                            showFeedback('Please select a valid image file', 'error');
                            return;
                          }
                          try {
                            const res = await compressImageFile(file, { maxWidth: 1920, maxHeight: 1080, quality: 0.82 });
                            setCategoryImageFile(res.file);
                            setCategoryImagePreview(URL.createObjectURL(res.file));
                            if (res.savingsPercent > 0) {
                              showFeedback(`⚡ Cover optimized: ${formatFileSize(res.originalSize)} ➔ ${formatFileSize(res.compressedSize)} (${res.savingsPercent}% saved)`, 'success');
                            }
                          } catch {
                            setCategoryImageFile(file);
                            setCategoryImagePreview(URL.createObjectURL(file));
                          }
                        }
                      }}
                      className="hidden"
                    />
                  </label>

                  {categoryImagePreview && (
                    <div className="relative mt-3 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 h-36 bg-stone-100 dark:bg-stone-800">
                      <Image
                        src={categoryImagePreview}
                        alt="Category cover preview"
                        fill
                        priority
                        sizes="300px"
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCategoryImageFile(null);
                          setCategoryImagePreview('');
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors shadow-md"
                        title="Remove image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => setIsCategoryModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold uppercase tracking-wider hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingCategory}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 disabled:opacity-50"
                  >
                    {submittingCategory ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>{categoryModalMode === 'edit' ? 'Update Category' : 'Save Category'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* PRODUCT ADD/EDIT MODAL */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 my-8">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center font-bold">
                    <Package className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    {productModalMode === 'edit' ? 'Edit Product' : 'Add New Product'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Product Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Premium White Oak Hardwood Plank"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                  />
                </div>

                {/* Category & Price Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                      Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                    >
                      <option value="" disabled>
                        Select Category...
                      </option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                      Price ($) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        required
                        placeholder="e.g. 7.99"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter detailed description of flooring material, dimensions, finish, durability..."
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                  />
                </div>

                {/* 1. Main Primary Image */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Main Primary Image <span className="text-rose-500">*</span>
                  </label>

                  <div className="space-y-3">
                    <label className="flex flex-col items-center justify-center p-3.5 border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#E85D04] dark:hover:border-[#E85D04] rounded-2xl cursor-pointer bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all text-center">
                      <Upload className="w-5 h-5 text-[#E85D04] mb-1" />
                      <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                        {productImageFile
                          ? productImageFile.name
                          : 'Select main primary product photo'}
                      </span>
                      <span className="text-[11px] font-bold text-[#E85D04] bg-[#E85D04]/10 px-2.5 py-1 rounded-lg mt-1.5 border border-[#E85D04]/20">
                        📐 Recommended: 800 × 800 px or 1000 × 1000 px (1:1 Square)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>

                    {/* Main Preview Container */}
                    {productImagePreview && (
                      <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 h-32 bg-stone-100 dark:bg-stone-800">
                        <Image
                          src={productImagePreview}
                          alt="Main Product preview"
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover"
                        />
                        <div className="absolute bottom-2 left-2 px-2.5 py-0.5 bg-black/70 backdrop-blur-md rounded-lg text-white text-[10px] font-bold uppercase tracking-wider">
                          Primary Image Preview
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Additional Gallery Images */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Additional Gallery Images (Optional)
                  </label>

                  <div className="space-y-3">
                    <label className="flex flex-col items-center justify-center p-3.5 border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#E85D04] dark:hover:border-[#E85D04] rounded-2xl cursor-pointer bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all text-center">
                      <ImageIcon className="w-5 h-5 text-[#E85D04] mb-1" />
                      <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                        Click to add multiple additional photos
                      </span>
                      <span className="text-[11px] font-bold text-[#E85D04] bg-[#E85D04]/10 px-2.5 py-1 rounded-lg mt-1.5 border border-[#E85D04]/20">
                        📐 Recommended: 800 × 800 px or 1200 × 900 px
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleAdditionalImagesChange}
                        className="hidden"
                      />
                    </label>

                    {/* Additional Images Grid Previews */}
                    {productAdditionalPreviews.length > 0 && (
                      <div className="grid grid-cols-4 gap-2 pt-1">
                        {productAdditionalPreviews.map((previewUrl, idx) => (
                          <div
                            key={idx}
                            className="relative h-20 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 group bg-stone-100 dark:bg-stone-800"
                          >
                            <Image
                              src={previewUrl}
                              alt={`Additional photo ${idx + 1}`}
                              fill
                              sizes="100px"
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeAdditionalImage(idx)}
                              className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-80 group-hover:opacity-100 hover:bg-rose-700 transition-all shadow-md"
                              title="Remove image"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <span className="absolute bottom-1 left-1 text-[9px] font-black text-white bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
                              #{idx + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold uppercase tracking-wider hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingProduct}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 disabled:opacity-50"
                  >
                    {submittingProduct ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading & Saving...</span>
                      </>
                    ) : (
                      <span>{productModalMode === 'edit' ? 'Update Product' : 'Save Product'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* PROJECT ADD/EDIT MODAL */}
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 max-w-4xl w-full shadow-2xl space-y-6 my-8">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center font-bold">
                    <FolderKanban className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    {projectModalMode === 'edit' ? 'Edit Project Gallery Item' : 'Add New Project'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleProjectSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Details & WH-Descriptions */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                        Project Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Modern Luxury Sheet Vinyl Installation in Dental Clinic"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                      />
                    </div>

                    {/* Category & Property Type Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Category */}
                      <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                          Category / Flooring Type <span className="text-rose-500">*</span>
                        </label>
                        <select
                          required
                          value={projectCategory}
                          onChange={(e) => setProjectCategory(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                        >
                          <option value="" disabled>
                            Select Category...
                          </option>
                          {categories.map((c) => (
                            <option key={c._id} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                          {projectCategory && !categories.some((c) => c.name === projectCategory) && (
                            <option value={projectCategory}>{projectCategory}</option>
                          )}
                        </select>
                      </div>

                      {/* Property Type */}
                      <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                          Property Type <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={projectPropertyType}
                          onChange={(e) => setProjectPropertyType(e.target.value as 'Residential' | 'Commercial')}
                          className="w-full px-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                        </select>
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                        Location / City <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Saskatoon & Area, Regina, SK"
                          value={projectLocation}
                          onChange={(e) => setProjectLocation(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                        />
                      </div>
                    </div>

                    {/* Project Description & Case Study Details (WH-Questions Guidance) */}
                    <div className="p-4 rounded-2xl bg-[#FAF6F0] dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#E85D04] uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-[#E85D04]" />
                        <span>Project Description & Story (WH-Question Format)</span>
                      </div>

                      {/* 1. What & Why (Challenge / Scope) */}
                      <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                          1. Project Scope & Challenge <span className="text-stone-400 font-normal">(WHAT & WHY)</span>
                        </label>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-1.5 leading-relaxed">
                          💡 <strong>What</strong> was the project and <strong>Why</strong> was it needed? Describe client requirement or site condition.
                        </p>
                        <textarea
                          rows={2}
                          placeholder="e.g. High-hygiene commercial dental clinic needed 100% watertight flooring compliant with SK health regulations..."
                          value={projectChallenge}
                          onChange={(e) => setProjectChallenge(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                        />
                      </div>

                      {/* 2. How (Solution & Execution) */}
                      <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                          2. HD Flooring Execution <span className="text-stone-400 font-normal">(HOW & SYSTEM)</span>
                        </label>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-1.5 leading-relaxed">
                          💡 <strong>How</strong> did HD Flooring install/solve it? Mention floor prep, installation method, or materials.
                        </p>
                        <textarea
                          rows={2}
                          placeholder="e.g. Installed heat-welded PVC sheet vinyl over self-leveled subfloor with seamless wall flash coving..."
                          value={projectSolution}
                          onChange={(e) => setProjectSolution(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                        />
                      </div>

                      {/* 3. Outcome & Result */}
                      <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                          3. Final Result & Benefits <span className="text-stone-400 font-normal">(OUTCOME)</span>
                        </label>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-1.5 leading-relaxed">
                          💡 What was the <strong>final result</strong> and benefit to the property owner?
                        </p>
                        <textarea
                          rows={2}
                          placeholder="e.g. Flawless anti-bacterial floor, easy to sanitize, 100% watertight with zero foot noise."
                          value={projectResult}
                          onChange={(e) => setProjectResult(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Photo Uploads & Previews */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Cover Image Upload */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                        Project Cover Photo <span className="text-rose-500">*</span>
                      </label>

                      <div className="space-y-3">
                        <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#E85D04] dark:hover:border-[#E85D04] rounded-2xl cursor-pointer bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all text-center">
                          <Upload className="w-6 h-6 text-[#E85D04] mb-1" />
                          <span className="text-xs font-bold text-stone-700 dark:text-stone-300 text-center">
                            {projectImageFile
                              ? projectImageFile.name
                              : 'Click to select or drop project photo'}
                          </span>
                          <span className="text-[11px] font-bold text-[#E85D04] bg-[#E85D04]/10 px-2.5 py-1 rounded-lg mt-1.5 border border-[#E85D04]/20">
                            📐 Recommended: 1200 × 800 px or 1920 × 1080 px (Landscape)
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProjectImageFileChange}
                            className="hidden"
                          />
                        </label>

                        {/* Preview Container */}
                        {projectImagePreview && (
                          <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 h-44 bg-stone-100 dark:bg-stone-800">
                            <Image
                              src={projectImagePreview}
                              alt="Project photo preview"
                              fill
                              priority
                              sizes="(max-width: 768px) 100vw, 400px"
                              className="object-cover"
                            />
                            <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg text-white text-[11px] font-semibold">
                              Main Cover Photo Preview
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Project Gallery Photos */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                        Additional Project Gallery Photos (Optional)
                      </label>
                      <div className="space-y-3">
                        <label className="flex flex-col items-center justify-center p-3.5 border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#E85D04] rounded-2xl cursor-pointer bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 transition-all text-center">
                          <Upload className="w-5 h-5 text-[#E85D04] mb-1" />
                          <span className="text-xs font-bold text-stone-700 dark:text-stone-300 text-center">
                            Click to select multiple gallery photos
                          </span>
                          <span className="text-[11px] font-bold text-[#E85D04] bg-[#E85D04]/10 px-2.5 py-1 rounded-lg mt-1.5 border border-[#E85D04]/20">
                            📐 Recommended: 1200 × 800 px (Landscape)
                          </span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleProjectAdditionalImagesChange}
                            className="hidden"
                          />
                        </label>

                        {projectAdditionalPreviews.length > 0 && (
                          <div className="grid grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
                            {projectAdditionalPreviews.map((imgUrl, idx) => (
                              <div key={idx} className="relative group rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 h-20 bg-stone-100 dark:bg-stone-800">
                                <Image
                                  src={imgUrl}
                                  alt={`Project gallery preview ${idx + 1}`}
                                  fill
                                  sizes="100px"
                                  className="object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeProjectAdditionalImage(idx)}
                                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-90 hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold uppercase tracking-wider hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingProject}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 disabled:opacity-50"
                  >
                    {submittingProject ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving Project...</span>
                      </>
                    ) : (
                      <span>{projectModalMode === 'edit' ? 'Update Project' : 'Save Project'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* PARTNER / BRAND ADD/EDIT MODAL */}
        {isPartnerModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center font-bold">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    {partnerModalMode === 'edit' ? 'Edit Partner / Brand' : 'Add New Partner / Brand'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPartnerModalOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                {/* Partner Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Partner / Brand Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mannington Commercial, Shaw Contract, NWFA"
                    value={partnerNameInput}
                    onChange={(e) => setPartnerNameInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                  />
                </div>

                {/* Partner Type */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Type / Category <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPartnerTypeInput('manufacturer')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        partnerTypeInput === 'manufacturer'
                          ? 'border-[#E85D04] bg-[#E85D04]/10 text-[#E85D04]'
                          : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Manufacturer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPartnerTypeInput('membership')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        partnerTypeInput === 'membership'
                          ? 'border-amber-600 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      <Handshake className="w-4 h-4" />
                      <span>Membership</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPartnerTypeInput('certification')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        partnerTypeInput === 'certification'
                          ? 'border-emerald-600 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      <Award className="w-4 h-4" />
                      <span>Certification</span>
                    </button>
                  </div>
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Logo Image <span className="text-rose-500">*</span>
                  </label>
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#E85D04] rounded-2xl cursor-pointer bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 transition-all text-center">
                    <Upload className="w-5 h-5 text-[#E85D04] mb-1" />
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                      Click to upload Brand / Partner / Certification Logo
                    </span>
                    <span className="text-[11px] font-bold text-[#E85D04] bg-[#E85D04]/10 px-2.5 py-1 rounded-lg mt-1.5 border border-[#E85D04]/20">
                      📐 Recommended: 400 × 250 px (Transparent PNG / SVG)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (!file.type.startsWith('image/')) {
                            showFeedback('Please select a valid image file', 'error');
                            return;
                          }
                          try {
                            const res = await compressImageFile(file, { maxWidth: 600, maxHeight: 400, quality: 0.85 });
                            setPartnerLogoFile(res.file);
                            setPartnerLogoPreview(URL.createObjectURL(res.file));
                            if (res.savingsPercent > 0) {
                              showFeedback(`⚡ Logo optimized: ${formatFileSize(res.originalSize)} ➔ ${formatFileSize(res.compressedSize)} (${res.savingsPercent}% saved)`, 'success');
                            }
                          } catch {
                            setPartnerLogoFile(file);
                            setPartnerLogoPreview(URL.createObjectURL(file));
                          }
                        }
                      }}
                      className="hidden"
                    />
                  </label>

                  {partnerLogoPreview && (
                    <div className="relative mt-3 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 h-28 bg-stone-100 dark:bg-stone-800/60 p-2 flex items-center justify-center">
                      <div className="relative w-full h-full max-h-24">
                        <Image
                          src={partnerLogoPreview}
                          alt="Partner logo preview"
                          fill
                          sizes="300px"
                          className="object-contain"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPartnerLogoFile(null);
                          setPartnerLogoPreview('');
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-xl shadow-md hover:bg-rose-600 transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Optional Website URL */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Official Website URL (Optional)
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="url"
                      placeholder="https://www.example.com"
                      value={partnerWebsiteInput}
                      onChange={(e) => setPartnerWebsiteInput(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    If provided, visitors can click this brand logo to visit the official website.
                  </p>
                </div>

                {/* Visibility Status */}
                <div className="pt-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Visibility Status
                  </label>
                  <button
                    type="button"
                    onClick={() => setPartnerIsActiveInput(!partnerIsActiveInput)}
                    className={`w-full py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      partnerIsActiveInput
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-500'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${partnerIsActiveInput ? 'bg-emerald-500' : 'bg-stone-400'}`} />
                    <span>{partnerIsActiveInput ? 'Active (Visible on website)' : 'Inactive (Hidden from website)'}</span>
                  </button>
                  <p className="text-[10px] text-stone-500 mt-1">
                    Only active partners and brands will appear on your website.
                  </p>
                </div>

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => setIsPartnerModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold uppercase tracking-wider hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingPartner}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 disabled:opacity-50 cursor-pointer"
                  >
                    {submittingPartner ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving Partner...</span>
                      </>
                    ) : (
                      <span>{partnerModalMode === 'edit' ? 'Update Partner' : 'Save Partner'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {deleteModalState.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
                <Trash2 className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                  Confirm Delete
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
                  Are you sure you want to delete{' '}
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    &quot;{deleteModalState.title}&quot;
                  </span>
                  ? This operation cannot be undone.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteModalState({ isOpen: false, type: 'product', id: '', title: '' })}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold uppercase tracking-wider hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deletingItem}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-rose-600/20 disabled:opacity-50"
                >
                  {deletingItem ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Yes, Delete</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
