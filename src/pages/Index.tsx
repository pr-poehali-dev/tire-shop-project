import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Tire {
  id: number;
  name: string;
  brand: string;
  size: string;
  type: 'Грузовые' | 'Коммерческие' | 'Сельхоз';
  price: number;
  image: string;
  loadIndex: number;
  speedIndex: string;
  season: string;
  stock: number;
}

const mockTires: Tire[] = [
  {
    id: 1,
    name: 'HeavyDuty Pro 3000',
    brand: 'TruckMaster',
    size: '315/80R22.5',
    type: 'Грузовые',
    price: 28500,
    image: 'https://cdn.poehali.dev/projects/393543a7-c3cb-4868-b813-4a93a4ad5f11/files/3f491782-2421-4166-bd66-0be1edb160d5.jpg',
    loadIndex: 156,
    speedIndex: 'L',
    season: 'Всесезонные',
    stock: 24
  },
  {
    id: 2,
    name: 'Commercial Express 500',
    brand: 'VanTech',
    size: '225/75R16',
    type: 'Коммерческие',
    price: 12800,
    image: 'https://cdn.poehali.dev/projects/393543a7-c3cb-4868-b813-4a93a4ad5f11/files/f4354622-427d-47e8-a476-4d65d2d83404.jpg',
    loadIndex: 121,
    speedIndex: 'R',
    season: 'Летние',
    stock: 48
  },
  {
    id: 3,
    name: 'Agro Tractor Plus',
    brand: 'FarmGrip',
    size: '480/80R50',
    type: 'Сельхоз',
    price: 65400,
    image: 'https://cdn.poehali.dev/projects/393543a7-c3cb-4868-b813-4a93a4ad5f11/files/c24e2db7-3e08-4ee3-851f-eefa99f0d6f4.jpg',
    loadIndex: 159,
    speedIndex: 'A8',
    season: 'Всесезонные',
    stock: 12
  },
  {
    id: 4,
    name: 'TruckStar Premium',
    brand: 'TruckMaster',
    size: '295/80R22.5',
    type: 'Грузовые',
    price: 24900,
    image: 'https://cdn.poehali.dev/projects/393543a7-c3cb-4868-b813-4a93a4ad5f11/files/3f491782-2421-4166-bd66-0be1edb160d5.jpg',
    loadIndex: 152,
    speedIndex: 'M',
    season: 'Зимние',
    stock: 36
  },
  {
    id: 5,
    name: 'Van Economy 200',
    brand: 'VanTech',
    size: '215/75R16',
    type: 'Коммерческие',
    price: 9800,
    image: 'https://cdn.poehali.dev/projects/393543a7-c3cb-4868-b813-4a93a4ad5f11/files/f4354622-427d-47e8-a476-4d65d2d83404.jpg',
    loadIndex: 116,
    speedIndex: 'R',
    season: 'Всесезонные',
    stock: 60
  },
  {
    id: 6,
    name: 'Agro Field Master',
    brand: 'FarmGrip',
    size: '520/85R42',
    type: 'Сельхоз',
    price: 58200,
    image: 'https://cdn.poehali.dev/projects/393543a7-c3cb-4868-b813-4a93a4ad5f11/files/c24e2db7-3e08-4ee3-851f-eefa99f0d6f4.jpg',
    loadIndex: 157,
    speedIndex: 'A8',
    season: 'Всесезонные',
    stock: 8
  }
];

export default function Index() {
  const [selectedType, setSelectedType] = useState<string>('Все');
  const [compareList, setCompareList] = useState<number[]>([]);
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  const [deliveryCity, setDeliveryCity] = useState('');
  const [quantity, setQuantity] = useState(4);

  const filteredTires = selectedType === 'Все' 
    ? mockTires 
    : mockTires.filter(tire => tire.type === selectedType);

  const toggleCompare = (id: number) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(item => item !== id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, id]);
    }
  };

  const addToCart = (id: number) => {
    const existing = cart.find(item => item.id === id);
    if (existing) {
      setCart(cart.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item));
    } else {
      setCart([...cart, {id, quantity: 1}]);
    }
  };

  const cartTotal = cart.reduce((sum, item) => {
    const tire = mockTires.find(t => t.id === item.id);
    return sum + (tire?.price || 0) * item.quantity;
  }, 0);

  const deliveryCost = deliveryCity ? 1500 : 0;
  const calculatorTotal = (mockTires[0]?.price || 0) * quantity + deliveryCost;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Truck" className="text-primary-foreground" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">ПроШины</h1>
                <p className="text-xs text-muted-foreground">Шины для профессионалов</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="text-sm hover:text-primary transition-colors">Каталог</a>
              <a href="#compare" className="text-sm hover:text-primary transition-colors">Сравнение</a>
              <a href="#calculator" className="text-sm hover:text-primary transition-colors">Калькулятор</a>
              <a href="#delivery" className="text-sm hover:text-primary transition-colors">Доставка</a>
              <a href="#contacts" className="text-sm hover:text-primary transition-colors">Контакты</a>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>Ваши выбранные товары</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => {
                        const tire = mockTires.find(t => t.id === item.id);
                        if (!tire) return null;
                        return (
                          <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                            <img src={tire.image} alt={tire.name} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{tire.name}</p>
                              <p className="text-xs text-muted-foreground">{tire.size}</p>
                              <p className="text-sm font-semibold text-primary mt-1">
                                {(tire.price * item.quantity).toLocaleString()} ₽
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">× {item.quantity}</p>
                            </div>
                          </div>
                        );
                      })}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Итого:</span>
                          <span className="text-2xl font-bold text-primary">{cartTotal.toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          <Icon name="CreditCard" className="mr-2" size={20} />
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-4">Профессиональные шины для вашего бизнеса</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Грузовые, коммерческие и сельхозшины от ведущих производителей
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" className="gap-2">
                <Icon name="Truck" size={20} />
                Грузовые
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="Package" size={20} />
                Коммерческие
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="Tractor" size={20} />
                Сельхоз
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Каталог шин</h3>
            <Tabs value={selectedType} onValueChange={setSelectedType}>
              <TabsList>
                <TabsTrigger value="Все">Все</TabsTrigger>
                <TabsTrigger value="Грузовые">Грузовые</TabsTrigger>
                <TabsTrigger value="Коммерческие">Коммерческие</TabsTrigger>
                <TabsTrigger value="Сельхоз">Сельхоз</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTires.map(tire => (
              <Card key={tire.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <img src={tire.image} alt={tire.name} className="w-full h-48 object-cover" />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge variant="outline" className="mb-2">{tire.type}</Badge>
                      <CardTitle className="text-lg">{tire.name}</CardTitle>
                      <CardDescription className="text-xs">{tire.brand}</CardDescription>
                    </div>
                    <Checkbox 
                      checked={compareList.includes(tire.id)}
                      onCheckedChange={() => toggleCompare(tire.id)}
                      disabled={!compareList.includes(tire.id) && compareList.length >= 3}
                    />
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Размер:</span>
                      <span className="font-medium">{tire.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Индекс нагрузки:</span>
                      <span className="font-medium">{tire.loadIndex}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Сезон:</span>
                      <span className="font-medium">{tire.season}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">В наличии:</span>
                      <span className="font-medium text-green-600">{tire.stock} шт</span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">{tire.price.toLocaleString()} ₽</p>
                      <p className="text-xs text-muted-foreground">за шт</p>
                    </div>
                    <Button onClick={() => addToCart(tire.id)} className="gap-2">
                      <Icon name="ShoppingCart" size={16} />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {compareList.length > 0 && (
        <section id="compare" className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold">Сравнение шин ({compareList.length}/3)</h3>
              <Button variant="outline" onClick={() => setCompareList([])}>
                Очистить
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-card rounded-lg overflow-hidden">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left font-semibold">Характеристика</th>
                    {compareList.map(id => {
                      const tire = mockTires.find(t => t.id === id);
                      return tire ? (
                        <th key={id} className="p-4 text-center min-w-[200px]">
                          <img src={tire.image} alt={tire.name} className="w-24 h-24 object-cover mx-auto mb-2 rounded" />
                          <p className="font-semibold text-sm">{tire.name}</p>
                        </th>
                      ) : null;
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Цена</td>
                    {compareList.map(id => {
                      const tire = mockTires.find(t => t.id === id);
                      return tire ? (
                        <td key={id} className="p-4 text-center">
                          <span className="text-xl font-bold text-primary">{tire.price.toLocaleString()} ₽</span>
                        </td>
                      ) : null;
                    })}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Размер</td>
                    {compareList.map(id => {
                      const tire = mockTires.find(t => t.id === id);
                      return tire ? <td key={id} className="p-4 text-center">{tire.size}</td> : null;
                    })}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Тип</td>
                    {compareList.map(id => {
                      const tire = mockTires.find(t => t.id === id);
                      return tire ? <td key={id} className="p-4 text-center">{tire.type}</td> : null;
                    })}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Индекс нагрузки</td>
                    {compareList.map(id => {
                      const tire = mockTires.find(t => t.id === id);
                      return tire ? <td key={id} className="p-4 text-center">{tire.loadIndex}</td> : null;
                    })}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Индекс скорости</td>
                    {compareList.map(id => {
                      const tire = mockTires.find(t => t.id === id);
                      return tire ? <td key={id} className="p-4 text-center">{tire.speedIndex}</td> : null;
                    })}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Сезон</td>
                    {compareList.map(id => {
                      const tire = mockTires.find(t => t.id === id);
                      return tire ? <td key={id} className="p-4 text-center">{tire.season}</td> : null;
                    })}
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="p-4 font-medium">В наличии</td>
                    {compareList.map(id => {
                      const tire = mockTires.find(t => t.id === id);
                      return tire ? (
                        <td key={id} className="p-4 text-center">
                          <span className="text-green-600 font-medium">{tire.stock} шт</span>
                        </td>
                      ) : null;
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section id="calculator" className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">Калькулятор стоимости</h3>
            
            <Card>
              <CardHeader>
                <CardTitle>Рассчитайте стоимость вашего заказа</CardTitle>
                <CardDescription>Выберите параметры для расчёта итоговой цены с доставкой</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Выберите шину</label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTires.map(tire => (
                        <SelectItem key={tire.id} value={tire.id.toString()}>
                          {tire.name} - {tire.size} ({tire.price.toLocaleString()} ₽)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Количество шин</label>
                  <Input 
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Город доставки</label>
                  <Input 
                    placeholder="Введите ваш город" 
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                  />
                  {deliveryCity && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Стоимость доставки: {deliveryCost.toLocaleString()} ₽
                    </p>
                  )}
                </div>

                <div className="border-t pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg">
                      <span>Шины ({quantity} шт):</span>
                      <span className="font-semibold">{((mockTires[0]?.price || 0) * quantity).toLocaleString()} ₽</span>
                    </div>
                    {deliveryCity && (
                      <div className="flex justify-between text-lg">
                        <span>Доставка:</span>
                        <span className="font-semibold">{deliveryCost.toLocaleString()} ₽</span>
                      </div>
                    )}
                    <div className="flex justify-between text-2xl font-bold text-primary pt-3 border-t">
                      <span>Итого:</span>
                      <span>{calculatorTotal.toLocaleString()} ₽</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6" size="lg">
                    <Icon name="ShoppingCart" className="mr-2" size={20} />
                    Добавить в корзину
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">Доставка и оплата</h3>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Icon name="Truck" className="text-primary" size={24} />
                </div>
                <CardTitle>Доставка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Доставка по всей России. Срок 3-7 дней. Бесплатно от 100 000 ₽</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Icon name="CreditCard" className="text-primary" size={24} />
                </div>
                <CardTitle>Оплата</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Наличные, карты, безналичный расчёт для юр. лиц с НДС</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Icon name="Shield" className="text-primary" size={24} />
                </div>
                <CardTitle>Гарантия</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Официальная гарантия производителя на все товары</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer id="contacts" className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Truck" className="text-primary-foreground" size={24} />
                </div>
                <h4 className="text-xl font-bold">ПроШины</h4>
              </div>
              <p className="text-sm text-muted-foreground">Профессиональные шины для вашего бизнеса</p>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Каталог</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Грузовые шины</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Коммерческие шины</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Сельхоз шины</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Акции</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Информация</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#delivery" className="hover:text-primary transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Оплата</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Гарантия</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">О компании</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Контакты</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <span>+7 (800) 555-35-35</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <span>info@proshiny.ru</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span>Москва, ул. Шинная 1</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 ПроШины. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
